const PORT = 3030;

const lineup = {
    _channels: [],
    _currentChannelIdx: 0,
    initialize: function() {
        this._currentChannelIdx = 0;
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
    getChannels: function() {
        return this._channels;
    },
    getCurrentChannelIdx: function() {
        return this._currentChannelIdx;
    }
};

export default lineup;
