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
    res.set('Access-Control-Allow-Methods', 'PUT');
    // A hack to handle 'OPTIONS' request sent by browser for CORS requests
    (req.method === 'OPTIONS') ? res.sendStatus(200) : next();
});

/**
 * Retrieves channels data
 * @param {[]} [channelIds] Array of ids of the channels to be retrieved
 * When 'channelIds' is not provided retrieves all channels data
 */
app.put('/channels', (req, res) => {
    const channelIds = req.body;

    console.log('Requesting channels');
    res.status(200).json(!(Array.isArray(channelIds) && channelIds.length) ? parsedChannelsData : parsedChannelsData.filter((channel) => {
        return (channelIds.includes(channel.channelId));
    }));
});

/**
 * Retrieves events data for the specified channel
 * @param {Object} [params]
 * @param {number} params.startTime - start time of events frame
 * @param {number} params.duration - duration of events frame
 * When 'params' is not provided all events are returned
 */
app.put('/events/:channelId', (req, res) => {
    const channelId = req.params.channelId;
    console.log('Requesting events for the channel', channelId);
    const events = channelEventsMap.get(channelId);
    if (events) {
        const startTime = req.body.startTime;
        const duration = req.body.duration;

        if (typeof(startTime) === 'number' || typeof(duration) === 'number') {
            res.status(200).json(filterEvents(events, startTime, duration));
        } else {
            res.status(200).json(events);
        }
    } else {
        res.sendStatus(400);
    }
});

app.all('*', (req, res) => {
    console.log('Not found', req.path);
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log('node.js data server is listening on port', PORT);
});
