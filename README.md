# ScraperNews 
Um projeto backend simples que coleta notícias de sites e envia as manchetes por e-mail usando Node.js.

## Funcionalidades
Coleta manchetes de notícias em tempo real

Envia e-mails com as últimas notícias formatadas

Configuração fácil via arquivo .env

## Crie o arquivo .env com:

EMAIL_HOST=smtp.gmail.com<br>
EMAIL_PORT=587<br>
EMAIL_USER=seuemail@gmail.com<br>
EMAIL_PASS=sua_app_password<br>
EMAIL_FROM=seuemail@gmail.com<br>
EMAIL_TO=destinatario@exemplo.com<br>


## Como Usar
Execute o comando:
npm start

O sistema irá:

Coletar as últimas manchetes do site configurado

Enviar um e-mail com as notícias para o destinatário

## Personalização

Ajustar quantidade: Modifique slice(0, 10) em scraperService.js

Editar layout: Atualize o HTML em emailService.js
