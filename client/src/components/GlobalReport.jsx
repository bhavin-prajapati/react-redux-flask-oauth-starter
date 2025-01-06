import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '@toolpad/core/PageContainer';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { getGame } from '../actionCreators/gameActionCreator';

const GlobalReportComponent = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    React.useEffect(() => {
        if (!(Object.keys(props.user).length === 0)) {
            const gameId = searchParams.get("gameId")
            props.getGame(gameId);
        }
    }, []);

    return (
        <PageContainer>
            <Grid spacing={1} alignContent={'center'}>
                <Typography display={"block"} variant="h4" component="div">
                    Global Report
                </Typography>
                <br />
                <Typography display={"block"} variant="h6" component="div">
                    Work in progress!
                </Typography>
            </Grid>
        </PageContainer>
    )
};

GlobalReportComponent.propTypes = {
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

const GlobalReport = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalReportComponent);

export default GlobalReport;
