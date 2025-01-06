import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '@toolpad/core/PageContainer';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { Chessboard } from "react-chessboard";
import { getGame } from '../actionCreators/gameActionCreator';

const GameComponent = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    React.useEffect(() => {
        if (!(Object.keys(props.user).length === 0)) {
            const gameId = searchParams.get("gameId")
            props.getGame(gameId);
        }
    }, []);

    return (
        <PageContainer>
            <Grid container spacing={1} alignContent={'center'}>
                <Chessboard boardWidth={600} id="BasicBoard" />
            </Grid>
        </PageContainer>
    )
};

GameComponent.propTypes = {
    game: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        game: state.games.game,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGame: getGame
    }, dispatch);
};

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);

export default Game;
