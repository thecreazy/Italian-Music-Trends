const fs = require('fs');
const path = require('path');

const getNlp = require("../utils/nlp");

require('better-logging')(console);

const getCategory = (result) => {
    if(result.intent === "feelings.sad") return "negative"
    if(result.intent==="feelings.good") return "positive"
    return result.sentiment.vote
}

const main = async () => {
  const nlp = await getNlp();
  const stats = {};
  const wordsForLyrics = require('../../files/calculated/wordsForLyrics.json');
  const lyricsValues = Object.values(wordsForLyrics);
  const [totalWords, listOfWords] = lyricsValues.reduce((acc, current) => {
    const [count, wordsArray] = acc;
    return [count + current.numberOfWords, [...wordsArray, ...current.values]];
  }, [0, []]);
  stats.avgWords = totalWords / lyricsValues.length;
  stats.words = {};
  stats.entry = [];
  listOfWords.forEach((word) => {
    if (!stats.words[word]) stats.words[word] = 1;
    else stats.words[word] += 1;
  });

  for(let w of Object.keys(stats.words)){
    if(stats.words[w] === 1) continue;
    const result = await nlp.process({
        locale: 'it',
        text: w
      });
    stats.entry.push({ x: w, value: stats.words[w], category: getCategory(result) })
  }

  delete stats.words;
  fs.writeFileSync(path.resolve(__dirname, '../../files/calculated/wordsStats.json'), JSON.stringify(stats, null, 4));
  fs.writeFileSync(path.resolve(__dirname, '../../docs/words-cloud/data.js'),`
    window.data = ${JSON.stringify(stats, null, 4)}
  `);
};

main();
