# Italian Music from 01/01/2022 to 28/03/2022 Sentiment Analysis 

I tried to analyze all the lyrics of the italian song released between the 01/01/2022 and the 28/03/2022 to get the sentiment of the italian singer.

Why? Because i was bored and had the time to learn something new.

### What i do

1. Download all the album released in the period between 01/01/2022 and 28/03/2022 [list here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/files/albums/albums.csv)
2. Using the spotify album take all the tracks for each album [list here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/files/albums/tracks.json) - [code here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/src/findListOfSongs/main.js)
3. For each track download the lyrics [list here](https://github.com/thecreazy/Italian-Music-Trends/tree/main/files/tracks) - [code here](https://github.com/thecreazy/Italian-Music-Trends/tree/main/src/downloadLyrics)
4. Calculated the most important words for each song [result here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/files/calculated/wordsForLyrics.json) - [code here](https://github.com/thecreazy/Italian-Music-Trends/tree/main/src/lyricsToWords)
5. Calculated for each "important" word the number of repetition and the sentiment [result here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/files/calculated/wordsStats.json) - [code here](https://github.com/thecreazy/Italian-Music-Trends/tree/main/src/createWordsStats)
6. Calculated for each song the negative and positive score (phrase by phrase) [result here](https://github.com/thecreazy/Italian-Music-Trends/blob/main/files/calculated/phasesStats.json) - [code here](https://github.com/thecreazy/Italian-Music-Trends/tree/main/src/createPhasesStats)

### Results

<a href="https://thecreazy.github.io/Italian-Music-Trends/words-cloud/">Words sentiment cloud chart</a>
<img src="https://raw.githubusercontent.com/thecreazy/Italian-Music-Trends/main/docs/cloud.png">

<a href="https://thecreazy.github.io/Italian-Music-Trends/phases-stats/">Sentiment stats for song</a>
<img src="https://raw.githubusercontent.com/thecreazy/Italian-Music-Trends/main/docs/py-sentiment.png">

Want to know more about the results? Get a look to the [releated medium article](https://blog.canellariccardo.it/what-is-the-mood-of-the-italian-music-released-during-the-first-three-months-of-this-year-51b1f83acd)