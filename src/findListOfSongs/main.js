const fs = require('fs');
const csv = require('@fast-csv/parse');
const path = require('path');

const downloadAlbumInfo = require('../functions/downloadAlbumInfo');

require('dotenv').config();
require('better-logging')(console);

const albums = [];

const main = () => {
  fs.createReadStream(path.resolve(__dirname, '../../files/albums/albums.csv'))
    .pipe(csv.parse())
    .on('error', (error) => console.error(error))
    .on('data', (row) => {
      albums.push({ artist: row[0], name: row[1] });
    })
    .on('end', async (rowCount) => {
      console.info(`Parsed ${rowCount} albums`);
      const newAlbum = await downloadAlbumInfo(albums);
      fs.writeFileSync(path.resolve(__dirname, '../../files/albums/tracks.json'), JSON.stringify(newAlbum, null, 4));
    });
};

main();
