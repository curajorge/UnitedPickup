import React, { Component } from 'react';
import axios from 'axios';

export class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            totalPlayers: 0,
            playersPlaying: 0
        };
    }

    
    
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleTotalPlayersChange = (event) => {
        this.setState({ totalPlayers: event.target.value });
    };

    handlePlayersPlayingChange = (event) => {
        this.setState({ playersPlaying: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7046/api/games', {
                name: this.state.name,
                totalPlayers: this.state.totalPlayers,
                playersPlaying: this.state.playersPlaying
            });
            console.log(response.data);
            // update the UI to show the newly created game
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <h3>Create Game</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Total Players:
                        <input type="number" value={this.state.totalPlayers} onChange={this.handleTotalPlayersChange} />
                    </label>
                    <br />
                    <label>
                        Players Playing:
                        <input type="number" value={this.state.playersPlaying} onChange={this.handlePlayersPlayingChange} />
                    </label>
                    <br />
                    <button type="submit">Create Game</button>
                </form>
            </div>
        );
    }
}

