import axios from 'axios';

const API_KEY = 'kyZ5XDqcRIxxvfi9dXRfsh5FevvGTdW7kLs62OMxN8CT1jyB9deMWIeU';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios.get(`search?query=${query}&page=${page}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// 'https://api.pexels.com/v1/search?query=nature&per_page=1';
