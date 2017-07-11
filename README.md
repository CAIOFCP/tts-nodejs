# tts-nodejs
Uma aplicação NodeJS simples para exemplificar o uso da biblioteca de Watson Text to Speech. Esta aplicação converte para um arquivo de audio um texto informado pelo usuario

# Instalação e configuração

## Clone e instale as dependencias
```
git clone https://github.com/hackatruck/tts-nodejs.git
cd tts-nodejs
npm install
```

## Configure as credenciais do serviço Watson Conversation

1. Acesse [bluemix.net](bluemix.net)
2. Crie uma instância do serviço Watson Text To Speech
3. Copie as credenciais do serviço (username e password) para o arquivo config.js

# Execute a aplicação
Execute a aplicação com o comando

    node app.js <mensagem de texto a ser convertida>

exemplo
    node app.js Bom dia
