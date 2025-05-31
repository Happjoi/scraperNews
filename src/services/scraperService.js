const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Realiza o scraping das últimas notícias do site G1
 * @returns {Promise<Array>} Lista de notícias
 */

async function scrapeNews() {
  try {
    const url = 'https://g1.globo.com/';
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      throw new Error(`Erro ao acessar a página: Status ${response.status}`);
    }

    const $ = cheerio.load(response.data);
    const news = [];

    // Extraindo as notícias principais
    $('.feed-post-link').each((index, element) => {
      const title = $(element).text().trim();
      const url = $(element).attr('href');
      
      if (title && url) {
        news.push({ title, url });
      }
    });

    // Limita a 10 notícias para o e-mail
    return news.slice(0, 10);
  } catch (error) {
    console.error('Erro no scraping:', error.message);
    return [];
  }
}

module.exports = { scrapeNews };