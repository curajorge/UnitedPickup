import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameDetails from './GameDetails';
import {AddPlayerToGame} from './AddPlayerToGame';
import { useParams } from 'react-router-dom';


function GamePage() {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;


    const { gameId } = useParams();

    
    useEffect(() => {
        axios.get(`${API_URL}/api/games/${gameId}`)
            .then(response => {
                setGame(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [gameId]);

    function handlePlayerAdded(player) {
        setGame(prevGame => {
            const newPlayers = [...prevGame.players, player];
            const newGame = { ...prevGame, players: newPlayers };
            return newGame;
        });
    }
    
    if (loading) {
        return <div>Loading game details...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    

    return (
        <div>
            <GameDetails game={game} />
            <AddPlayerToGame gameId={game.id} onPlayerAdded={handlePlayerAdded} />
        </div>
    );
}

export default GamePage;
