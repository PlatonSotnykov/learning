const fs = require('fs');
const path = require('path');
const express = require('express');

const DATA_PATH = './data';
const CHANNELS_FILE = 'channels.json';
const EVENTS_FILE = 'events_{channelId}.json';

let channels;

// Read channels data
const filePath = path.join(DATA_PATH, CHANNELS_FILE);
try {
    const channelsData = fs.readFileSync(filePath, 'utf8');
    channels = JSON.parse(channelsData);
} catch (e) {
    console.log(`Error reading and parsing channels file "${filePath}"`, e);
    process.exit(1);
}
const channelIds = channels.map(channel => channel.channelId);

// Helpers
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonContent = data ? JSON.parse(data) : null;
                    resolve(jsonContent);
                } catch (err) {
                    console.log(`Error parsing events file "${filePath}"`, err);
                    reject(err);
                }
            }
        });
    });
}

const dayLength = 24 * 3600;

function getFileNames(channelId, startTime, duration) {
    let dayStart = startTime - startTime % dayLength;
    const endTime = startTime + duration;
    const files = [];

    do {
        files.push(`${channelId}_${dayStart}-${dayStart + dayLength}.json`);
        dayStart += dayLength;
    } while (endTime > dayStart);

    return files;
}

function filterEvents(events, startTime, duration) {
    const endTime = startTime + duration;

    return events.filter(event => (event.endTime > startTime) && (event.startTime < endTime));
}

const PORT = 3030;

const app = express();

// parses JSON body
app.use(express.json({ strict: false }));

app.use('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'PUT');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
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

    res.status(200).json(!(Array.isArray(channelIds) && channelIds.length) ? channels : channels.filter((channel) => {
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

    if (!channelIds.includes(channelId)) {
        return res.sendStatus(400);
    }

    const startTime = req.body.startTime;
    const duration = req.body.duration;

    if (typeof(startTime) !== 'number' || typeof(duration) !== 'number') {
        return res.sendStatus(400);
    }

    const fileNames = getFileNames(channelId, startTime, duration);

    if (!fileNames.length) {
        return res.status(200).json([]);
    }

    const readPromises = [];

    fileNames.forEach(fileName => readPromises.push(readJSONFile(path.join(DATA_PATH, fileName))));
    Promise.all(readPromises)
        .then((results) => {
            const events = new Map();

            results.forEach((result) => {
                if (result) {
                    // Put all events into the Map to get rid of duplicated events
                    result.events.forEach(event => events.set(event.eventId, event));
                }
            });
            res.status(200).json(filterEvents([...events.values()], startTime, duration));
        })
        .catch((e) => {
            console.log('Error reading events file', e);
            res.status(200).json([]);
        });
});

app.all('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log('node.js data server is listening on port', PORT);
});
