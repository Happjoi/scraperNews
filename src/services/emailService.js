const nodemailer = require('nodemailer');
require('dotenv').config()

/**
 * Configura e envia um e-mail com as notícias
 * @param {Array} news - Lista de notícias
 */
async function sendNewsEmail(news) {
  try {
    // Configurações do transporter (servidor SMTP)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        
        tls: {
        rejectUnauthorized: false
        }
    });

    // Formata as notícias em HTML
    const newsHtml = news.map(item => 
      `<li><a href="${item.url}" style="color: #1a0dab; text-decoration: none;">${item.title}</a></li>`
    ).join('');

    // Configuração do e-mail
    const mailOptions = {
      from: `"News Scraper" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: '📰 Últimas Notícias do Momento',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
            Últimas Notícias do G1
          </h2>
          <ul style="line-height: 1.6;">
            ${newsHtml}
          </ul>
          <p style="margin-top: 20px; font-size: 0.9em; color: #7f8c8d;">
            Este e-mail foi gerado automaticamente pelo News Scraper.
          </p>
        </div>
      `,
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.message);
    return false;
  }
}

module.exports = { sendNewsEmail };