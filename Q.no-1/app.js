const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// John Doe Railway Server API base URL
const baseURL = 'http://20.244.56.144/train';

// Sample company credentials (from registration response)
const companyCredentials = {
  clientID: 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27',
  clientSecret: 'XOyol0RPayKBODAN',
};

// Helper function to get the authorization token
async function getAuthToken() {
  try {
    const response = await axios.post(`${baseURL}/auth`, {
      companyName: 'Train Central',
      ...companyCredentials,
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to get the authorization token.');
  }
}

// Helper function to get all trains from the server
async function getAllTrains() {
  try {
    const authToken = await getAuthToken();
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axios.get(`${baseURL}/trains`, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train data.');
  }
}

// API endpoint to get real-time train schedules for the next 12 hours
app.get('/api/trains', async (req, res) => {
  try {
    const allTrains = await getAllTrains();

    // Get current time in minutes
    const currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    // Filter trains departing in the next 12 hours and ignore trains departing in the next 30 minutes
    const next12HoursTrains = allTrains.filter((train) => {
      const departureTimeInMinutes =
        train.departureTime.Hours * 60 + train.departureTime.Minutes + train.delayedBy;
      return departureTimeInMinutes > currentTimeInMinutes && departureTimeInMinutes <= currentTimeInMinutes + 720;
    });

    // Sort the remaining trains based on price, available seats, and departure time
    next12HoursTrains.sort((a, b) => {
      // Sort based on price in ascending order
      const priceA = a.price.sleeper + a.price.AC;
      const priceB = b.price.sleeper + b.price.AC;
      if (priceA !== priceB) {
        return priceA - priceB;
      }

      // Sort based on total available seats in descending order
      const totalSeatsA = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
      const totalSeatsB = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
      if (totalSeatsA !== totalSeatsB) {
        return totalSeatsB - totalSeatsA;
      }

      // Sort based on departure time in descending order
      const departureTimeA = a.departureTime.Hours * 60 + a.departureTime.Minutes + a.delayedBy;
      const departureTimeB = b.departureTime.Hours * 60 + b.departureTime.Minutes + b.delayedBy;
      return departureTimeB - departureTimeA;
    });

    res.json(next12HoursTrains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch train data.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
