require('dotenv').config();
const { scrapeNews } = require('./services/scraperService');
const { sendNewsEmail } = require('./services/emailService');
const { checkEmailConfig } = require('./config/emailConfig');

async function main() {
  console.log('🚀 Iniciando processo de scraping e envio de e-mail...');
  
  // Verifica a configuração de e-mail
  if (!checkEmailConfig()) {
    console.error('❌ Configuração de e-mail incompleta. Abortando...');
    return;
  }

  try {
    // 1. Realiza o scraping das notícias
    console.log('🔍 Coletando as últimas notícias...');
    const news = await scrapeNews();
    
    if (news.length === 0) {
      console.log('ℹ️ Nenhuma notícia encontrada. Abortando envio de e-mail.');
      return;
    }

    console.log(`✅ ${news.length} notícias encontradas!`);
    
    // 2. Envia as notícias por e-mail
    console.log('✉️ Enviando e-mail com as notícias...');
    const emailSent = await sendNewsEmail(news);
    
    if (emailSent) {
      console.log('🎉 E-mail enviado com sucesso!');
    } else {
      console.log('❌ Falha ao enviar o e-mail.');
    }
  } catch (error) {
    console.error('⚠️ Erro no processo principal:', error.message);
  }
}

main();