import React, { Component } from 'react';
import axios from 'axios';

export class AllGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentDidMount() {
        axios.get('https://localhost:7046/api/games')
            .then(response => {
                this.setState({ games: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>All Games</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Total Players</th>
                        <th>Players Playing</th>
                        <th>Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.games.map(game => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.name}</td>
                            <td>{game.totalPlayers}</td>
                            <td>{game.playersPlaying}</td>
                            <td>
                                <ul>
                                    {game.players.map(player => (
                                        <li key={player.id}>{player.name} ({player.contact})</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}


