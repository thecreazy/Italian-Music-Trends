const path = require('path');
const fs = require('fs');
const getNlp = require("../utils/nlp");

require('better-logging')(console);


const main = async () => {
  const nlp = await getNlp();
  const lyrics = [];
  const directoryPath = path.join(__dirname, '../../files/tracks');
  const dirFiles = fs.readdirSync(directoryPath);
  for (const file of dirFiles) {
    const filePath = path.join(__dirname, '../../files/tracks', file);
    const songInfo = require(filePath);
    const { trackLyrics } = songInfo;
    const lyricsbySong = []
    for(let line of trackLyrics.lines) {
        const transformedLine = line.words.replace(/[.,/#!?"$%^&*;:{}=\-_`~()]/g, '');
        const result = await nlp.process({
            locale: 'it',
            text: transformedLine
        });
        lyricsbySong.push({x: transformedLine, vote: result.sentiment.vote, score: Math.abs(result.sentiment.score)})
    }
    const songStats = lyricsbySong.reduce((acc, current, index) => {
        return {
            numberOfRows: index +1,
            positiveScore: current.vote === "positive" ? acc.positiveScore+= current.score : acc.positiveScore,
            negativeScore: current.vote === "negative" ? acc.negativeScore+= current.score : acc.negativeScore
        }
    }, {
        numberOfRows: 0,
        positiveScore: 0,
        negativeScore: 0
    });
    lyrics.push(songStats);
  }
  fs.writeFileSync(path.resolve(__dirname, '../../files/calculated/phasesStats.json'), JSON.stringify(lyrics, null, 4));
  fs.writeFileSync(path.resolve(__dirname, '../../docs/phases-stats/data.js'),`
      window.data = ${JSON.stringify(lyrics, null, 4)}
  `);
};

main();
