const path = require('path');
const fs = require('fs');
const stopword = require('stopword');

require('better-logging')(console);

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const main = () => {
  const lyrics = {};
  const directoryPath = path.join(__dirname, '../../files/tracks');
  const dirFiles = fs.readdirSync(directoryPath);
  for (const file of dirFiles) {
    const filePath = path.join(__dirname, '../../files/tracks', file);
    const songInfo = require(filePath);
    const { trackLyrics, trackInfo } = songInfo;
    const finalTrack = trackLyrics.lines.reduce((prev, current) => {
      const newString = `${prev} ${current.words.toLowerCase().replace(/[.,/#!?"$%^&*;:{}=\-_`~()]/g, '')}`;
      return newString;
    }, '');
    const noEngStopWords = stopword.removeStopwords(finalTrack.split(' '));
    const noItaStopWords = stopword.removeStopwords(noEngStopWords, stopword.ita);
    const noSpaStopWords = stopword.removeStopwords(noItaStopWords, stopword.spa);
    const uniqueValues = noSpaStopWords.filter(onlyUnique);
    const noEmptyValues = uniqueValues.filter((v) => !!v);
    lyrics[trackInfo.id] = noEmptyValues;
  }
  fs.writeFileSync(path.resolve(__dirname, '../../files/calculated/wordsForLyrics.json'), JSON.stringify(lyrics, null, 4));
};

main();
