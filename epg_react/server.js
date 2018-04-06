const fs = require('fs');
const path = require('path');
const express = require('express');

const DATA_PATH = './data';
const CHANNELS_FILE = 'channels.json';
const EVENTS_FILE = 'events_{channelId}.json';

let parsedChannelsData;

const filePath = path.join(DATA_PATH, CHANNELS_FILE);
try {
    const channelsData = fs.readFileSync(filePath, 'utf8');
    parsedChannelsData = JSON.parse(channelsData);
} catch (e) {
    console.log(`Error reading and parsing channels file "${filePath}"`, e);
    process.exit(1);
}

const channelEventsMap = new Map();
const channelIds = parsedChannelsData.map(channel => channel.channelId);

channelIds.forEach((channelId) => {
    const filePath = path.join(DATA_PATH, EVENTS_FILE.replace('{channelId}', channelId));
    try {
        const eventsData = fs.readFileSync(filePath, 'utf8');
        const parsedEventsData = JSON.parse(eventsData);
        channelEventsMap.set(channelId, parsedEventsData);
    } catch (e) {
        console.log(`Error reading and parsing events file "${filePath}"`, e);
        channelEventsMap.set(channelId, []);
    }
});

function filterEvents(events, startTime, duration) {
    const endTime = startTime + duration;

    return events.filter((event) => {
        return (event.endTime > startTime && event.startTime < startTime)
            || (event.startTime < endTime && event.endTime > endTime)
            || (event.startTime >= startTime && event.endTime <= endTime);
    });
}

const PORT = 3030;

const app = express();

// parses JSON body
app.use(express.json({ strict: false }));

app.use('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/channels', (req, res) => {
    console.log('Requesting channels');
    res.status(200).json(parsedChannelsData);
});

app.put('/events/:channelId', (req, res) => {
    const channelId = req.params.channelId;
    console.log('Requesting events for the channel', channelId);
    const events = channelEventsMap.get(channelId);
    if (events) {
        const startTime = req.body.startTime;
        const duration = req.body.duration;

        if (typeof(startTime) !== 'number' || typeof(duration) !== 'number') {
            res.status(400).send('Bad request');
        } else {
            res.status(200).json(filterEvents(events, startTime, duration));
        }
    } else {
        res.status(400).send('Bad request');
    }
});

app.all('*', (req, res) => {
    console.log('Not found', req.path);
    res.status(404).send('Not found');
});

app.listen(PORT, () => {
    console.log('node.js data server is listening on port', PORT);
});
