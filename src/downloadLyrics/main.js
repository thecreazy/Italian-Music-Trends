const fs = require('fs');
const csv = require('@fast-csv/parse');
const path = require('path');

const getLyrics = require('../functions/getLyrics');
const getTrackInfo = require('../functions/getTrackInfo');
const delay = require('../functions/delay');

require('dotenv').config();
require('better-logging')(console);

const main = async () => {
    const albumInfo = require("../../files/albums/tracks.json");
    const songIds = albumInfo.reduce((acc, current) => {
        if(current.tracks && current.tracks.items){
            const albumIDs = current.tracks.items.map(({id}) => id);
            albumIDs.forEach(id => {
                acc.push(id)
            });
            return acc
        } else return acc
    }, [])
    for(var i in songIds){
        const filePath = path.resolve(__dirname, `../../files/tracks/${songIds[i]}.json`);
        if (fs.existsSync(filePath)) continue;
        const trackLyrics = await getLyrics({ id:songIds[i] });
        const trackInfo = await getTrackInfo({ id: songIds[i] });
        console.info(`Parsed ${songIds[i]} track`);
        const finalInfo = {
            trackLyrics,
            trackInfo
        }
        delay(500);
        if(trackLyrics) fs.writeFileSync(filePath, JSON.stringify(finalInfo, null, 4));
    }
};

main();