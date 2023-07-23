import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@material-ui/core';
import { getAllTrains } from '../api/api';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const allTrains = await getAllTrains();
        setTrains(allTrains);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <CircularProgress />
      ) : (
        trains.map((train) => (
          <Grid item xs={12} sm={6} md={4} key={train.trainNumber}>
            <Card>
              <CardContent>
                <Typography variant="h6">{train.trainName}</Typography>
                <Typography variant="subtitle1">Train Number: {train.trainNumber}</Typography>
                <Typography variant="subtitle2">Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</Typography>
                <Typography variant="body1">Delay: {train.delayedBy} mins</Typography>
                <Typography variant="body1">Sleeper Seats Available: {train.seatsAvailable.sleeper}</Typography>
                <Typography variant="body1">AC Seats Available: {train.seatsAvailable.AC}</Typography>
                <Typography variant="body1">Sleeper Price: ${train.price.sleeper}</Typography>
                <Typography variant="body1">AC Price: ${train.price.AC}</Typography>
                <Button component={Link} to={`/train/${train.trainNumber}`} variant="contained" color="primary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TrainList;
