import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { getSingleTrain } from '../api/api';

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const singleTrain = await getSingleTrain(trainNumber);
        setTrain(singleTrain);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTrain();
  }, [trainNumber]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
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
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SingleTrain;
