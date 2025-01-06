import React, { useState } from "react";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FormControl,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../actionCreators/gameActionCreator';

const CreateComponent = (props) => {
  const initialValues = {
    type: "chess",
    opponent: "computer"
  };
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [formValues, setFormValues] = useState(initialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" >
          <h1>Create New Game</h1>
          <Grid item>
            <FormControl>
              <Select
                name="type"
                value={formValues.type}
                onChange={handleInputChange}
              >
                <MenuItem key="chess" value="chess">
                  Chess
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl>
              <Select
                name="opponent"
                value={formValues.opponent}
                onChange={handleInputChange}
              >
                <MenuItem key="computer" value="computer">
                  Computer
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button onClick={() => { props.createGame(formValues); navigate("/") }} variant="contained" color="primary" style={{
              backgroundColor: "green",
              margin: "5px"
            }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

CreateComponent.propTypes = {
  createGame: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createGame: createGame
  }, dispatch);
};

const Create = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComponent);

export default Create;
