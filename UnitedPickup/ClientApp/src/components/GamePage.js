import React from 'react';
import axios from 'axios';
import GameDetails from './GameDetails';
import AddPlayerToGame from './AddPlayerToGame';
import { useParams } from 'react-router-dom';

const { gameId } = useParams();


export class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        // const gameId = this.props.match.params.gameId;

        
        alert(gameId);
        
        axios.get(`/api/games/${gameId}`)
            .then(response => {
                this.setState({ game: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error: error, loading: false });
            });
    }

    render() {
        const { game, loading, error } = this.state;

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
}

