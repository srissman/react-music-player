import React from 'react';

import Axios from 'axios';

import Sound from 'react-sound';

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : '5ef283c9ce1745d2b3ba23d19516616f',
  clientSecret : 'a03ba33ff6394ebd96263e77ce26eeb1',
  redirectUri : 'http://www.example.com/callback'
});

class AppContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
        // What ever is returned, we just need these 3 values
        track: {title: '', artwork_url: ''},
        playStatus: Sound.status.STOPPED,
    }
	}

	componentDidMount() {
		this.randomTrack();
	}

	render () {
		return (
			<div className="scotch_music">
				<Sound
		           url={this.prepareUrl(this.state.track.stream_url)}
		           playStatus={this.state.playStatus}
		           onPlaying={this.handleSongPlaying.bind(this)}
		           playFromPosition={this.state.playFromPosition}
		           onFinishedPlaying={this.handleSongFinished.bind(this)}/>
			</div>
			)
	}

	randomTrack () {
    let _this = this;

    //Request for a playlist via Soundcloud using a client id
    spotifyApi.getMySavedTracks({
    limit : 2,
    offset: 1
  		})
        .then(function (response) {
            // Store the length of the tracks
            const trackLength = response.data.items.length;

            // Pick a random number
            const randomNumber = Math.floor((Math.random() * trackLength) + 1);

            // Set the track state with a random track from the playlist
            _this.setState({track: response.data.items[randomNumber]});
        })
        .catch(function (err) {
            // If something goes wrong, let us know
            console.log(err);
        });
	}

	handleSongPlaying(audio) {
    this.setState({  elapsed: this.formatMilliseconds(audio.position),
        total: this.formatMilliseconds(audio.duration),
        position: audio.position / audio.duration })
}
}

export default AppContainer