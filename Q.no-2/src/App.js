import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import TrainList from './components/TrainList';
import SingleTrain from './components/SingleTrain';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Train Schedule</Typography>
          <Button component={Link} to="/" color="inherit" style={{ marginLeft: 'auto' }}>
            All Trains
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Route exact path="/" component={TrainList} />
        <Route path="/train/:trainNumber" component={SingleTrain} />
      </Container>
    </Router>
  );
}

export default App;
