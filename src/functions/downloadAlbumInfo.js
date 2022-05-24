const axios = require('axios');

const delay = require('./delay');

const searchForAlbum = async ({ q }) => {
  const options = {
    method: 'GET',
    url: `${process.env.SPOTIFY_ENDPOINT}/search`,
    params: {
      q,
      type: 'album',
      numberOfTopResults: '5',
    },
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  };
  const albumFound = await axios.request(options);
  const { data } = albumFound;
  if (data?.albums?.items[0]?.uri) return data.albums.items[0].uri.split(':')[2];
  return undefined;
};

const getAlbumInfo = async ({ id }) => {
  const options = {
    method: 'GET',
    url: `${process.env.SPOTIFY_ENDPOINT}/albums`,
    params: { ids: id },
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  };
  const response = await axios.request(options);
  const { data } = response;
  const [album] = data.albums;
  return album.tracks;
};

const downloadAlbumInfo = async (albums) => {
  const albumCopy = [...albums];
  for (const i in albumCopy) {
    const album = albumCopy[i];
    const albumId = await searchForAlbum({
      q: `${album.artist} ${album.name}`,
    });
    if (albumId) {
      albumCopy[i].spotifyAlbumId = albumId;
      const tracks = await getAlbumInfo({
        id: albumId,
      });
      albumCopy[i].tracks = tracks;
    }
    await delay(1000);
  }
  return albumCopy;
};

module.exports = downloadAlbumInfo;
