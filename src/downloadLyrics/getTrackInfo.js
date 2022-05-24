const axios = require('axios');

const getTrackInfo = async ({ id }) => {
  const options = {
    method: 'GET',
    url: `${process.env.SPOTIFY_ENDPOINT}/tracks/${id}`,
    params: {},
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  };
  const trackFound = await axios.request(options);
  const { data } = trackFound;
  return data;
};

module.exports = getTrackInfo;
