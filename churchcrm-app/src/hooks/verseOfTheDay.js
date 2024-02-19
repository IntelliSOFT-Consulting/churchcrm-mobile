import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getVerseOfTheDayWithImage() {
  const URL = 'https://www.bible.com/verse-of-the-day';
  try {
    const {data} = await axios.get(URL);
    const $ = cheerio.load(data);

    const versesArray = [];
    const citationsArray = [];
    const imageArray = [];
    const verses = $('p.text-gray-50');
    const citations = $('.mbs-2');

    await citations.each((i, p) => {
      let citation = $(p).eq(0).text();
      citationsArray.push(citation);
    });

    await verses.each((i, p) => {
      let unformattedVerse = $(p).eq(0).text();
      let formattedVerse = unformattedVerse.replace(/\n/g, ' ');
      versesArray.push(formattedVerse);
    });

    const imageUrl = $('img').attr('src');
    imageArray.push(imageUrl);
    console.log('Image URL:', imageUrl);

    return {
      citation: citationsArray[1],
      passage: versesArray[0],
      imageUrl: imageArray[0],
    };
  } catch (err) {
    console.error(err);
  }
}
