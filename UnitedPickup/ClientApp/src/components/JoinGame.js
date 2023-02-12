import React from 'react';
import axios from 'axios';

export class JoinGame extends React.Component {
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

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/games/${this.props.gameId}/players`, {
                name: this.state.name,
                contact: this.state.contact
            });
            console.log(response.data);
            // update the UI to show the newly added player
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h3>Join Game</h3>
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
                    <button type="submit">Join Game</button>
                </form>
            </div>
        );
    }
}

