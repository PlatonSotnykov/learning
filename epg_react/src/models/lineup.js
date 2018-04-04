const PORT = 3030;

const lineup = {
    _channels: [],
    initialize: () => {
        return fetch(`http://localhost:${PORT}/channels`, {
            method: 'PUT',
        }).then((response) => {
            if (response.ok) {
                return response.json().then((channels) => {
                    channels.sort((channel1, channel2) => channel1.channelNumber - channel2.channelNumber);
                    return this._channels = channels;
                });
            }
            return [];
        });
    },
    getChannels: () => this._channels
};

export default lineup;
