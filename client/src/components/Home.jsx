import React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getGames } from '../actionCreators/gameActionCreator';
import game_card_chess from '../assets/game_card_chess.jpg';

const HomeComponent = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!(Object.keys(props.user).length === 0)) {
      props.getGames();
    }
  }, []);

  return (
    <PageContainer>
      <Grid container spacing={1}>
        {
          props.games && props.games.length > 0 ? props.games.map((game) => {
            return (
              <Card key={game.id} sx={{ width: 280, maxWidth: 280, margin: "0 15px 15px 0" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={game_card_chess}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {game.type.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.user.name} vs {game.opponent}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" size="small" onClick={() => navigate(`/game?gameId=${game.id}`)}>Play!</Button>
                  <Button variant="outlined" size="small">Learn More</Button>
                </CardActions>
              </Card>
            )
          }) : (
            <Typography gutterBottom variant="h5" component="div">
              You have not created any games yet!
            </Typography>
          )
        }
      </Grid>
    </PageContainer>
  )
}

HomeComponent.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    opponent: PropTypes.string,
  })),
};

const mapStateToProps = (state) => {
  return {
    games: state.games.games,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGames: getGames
  }, dispatch);
};

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;
