import React from 'react';

class GameDetails extends React.Component {
    render() {
        const { game } = this.props;

        return (
            <div>
                <h1>{game.name}</h1>
                <p>Game ID: {game.id}</p>
                <p>Player Limit: {game.totalPlayers}</p>
                <p>Players Playing: {game.playersPlaying}</p>
                <p>Players:</p>
                <ul>
                    {game.players.map(player => (
                        <li key={player.id}>{player.name} ({player.contact})</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GameDetails;
