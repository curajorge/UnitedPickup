import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';
import AddPlayerToGame from './AddPlayerToGame';

function GamePage() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { gameId } = useParams();

    useEffect(() => {
        axios.get(`https://localhost:7046/api/games/${gameId}`)
            .then(response => {
                setGame(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [gameId]);

    if (loading) {
        return <div>Loading game details...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>            
            <GameDetails game={game} />
            <AddPlayerToGame gameId={game.id} />
        </div>
    );
}

export default GamePage;