const axios = require('axios');

const getLyrics = async ({ id }) => {
    const options = {
      method: 'GET',
      url: `${process.env.RAPIDAPI_ENDPOINT}`,
      params: {id},
      headers: {
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_TOKEN
      },
    };
    const albumFound = await axios.request(options);
    const { data } = albumFound;
    return data.lyrics;
  };


module.exports = getLyrics;