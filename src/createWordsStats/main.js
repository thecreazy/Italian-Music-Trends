const fs = require('fs');
const path = require('path');

require('better-logging')(console);

const main = () => {
  const stats = {};
  const wordsForLyrics = require('../../files/calculated/wordsForLyrics.json');
  const lyricsValues = Object.values(wordsForLyrics);
  const [totalWords, listOfWords] = lyricsValues.reduce((acc, current) => {
    const [count, wordsArray] = acc;
    return [count + current.numberOfWords, [...wordsArray, ...current.values]];
  }, [0, []]);
  stats.avgWords = totalWords / lyricsValues.length;
  stats.words = {};
  listOfWords.forEach((word) => {
    if (!stats.words[word]) stats.words[word] = 1;
    else stats.words[word] += 1;
  });
  fs.writeFileSync(path.resolve(__dirname, '../../files/calculated/wordsStats.json'), JSON.stringify(stats, null, 4));
};

main();
