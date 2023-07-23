import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; // Replace with your backend API URL

export const getAllTrains = async () => {
  try {
    const response = await axios.get(`${baseURL}/trains`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train data.');
  }
};

export const getSingleTrain = async (trainNumber) => {
  try {
    const response = await axios.get(`${baseURL}/trains/${trainNumber}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train data.');
  }
};
