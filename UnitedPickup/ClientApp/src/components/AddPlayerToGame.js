
import React from 'react';
import axios from 'axios';

export class AddPlayerToGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contact: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleContactChange(event) {
        this.setState({ contact: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const API_URL = process.env.REACT_APP_API_URL;

        axios.post(`${API_URL}/api/games/${this.props.gameId}/players`, {
            name: this.state.name,
            contact: this.state.contact
        })
            .then(response => {
                console.log(`Player ${response.data.playerId} added to game ${this.props.gameId}.`);
                this.setState({ name: '', contact: '' });
                this.props.onPlayerAdded();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br />
                <label>
                    Contact:
                    <input type="text" value={this.state.contact} onChange={this.handleContactChange} />
                </label>
                <br />
                <button type="submit">Add Player</button>
            </form>
        );
    }
}

