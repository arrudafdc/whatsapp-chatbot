# Chatbot de Atendimento Automático para WhatsApp

Chatbot desenvolvido em Node.js utilizando a biblioteca WhatsApp Web para fornecer atendimento automático aos clientes via WhatsApp.

![Texto Alternativo](https://github.com/arrudafdc/whatsapp-chatbot/blob/main/assets/captura1.png)

![Texto Alternativo](https://github.com/arrudafdc/whatsapp-chatbot/blob/main/assets/captura2.png)

![Texto Alternativo](https://github.com/arrudafdc/whatsapp-chatbot/blob/main/assets/captura3.png)

## Funcionalidades

- **Respostas Automáticas**: O bot é capaz de responder automaticamente às mensagens dos clientes com informações sobre serviços, eventos, fotos, etc.
- **Redirecionamento para Atendentes**: Os clientes têm a opção de serem redirecionados para um atendente humano quando necessário.
- **Envio de documentos**: Os clientes podem solicitar um mídia kit e o bot enviará o arquivo em formato PDF.

## Instalação e Uso

Clone o repositório para o seu ambiente local:

```
$ git clone https://github.com/arrudafdc/whatsapp-chatbot

$ cd whatsapp-chatbot
```

Instale as dependências:

```
$ npm install
```

Dentro da variável "isClientMessage" mude a string do message.id.remote para o id que você deseja simular um cliente:

```javascript
const isClientMessage = message.id.remote === "seuIdAqui" && !message.fromMe;
// Exemplo 
const isClientMessage = message.id.remote === "558296235320@c.us" && !message.fromMe;

```

Execute o bot
```
$ npm start
```

Escaneie o QR Code exibido no terminal com o seu WhatsApp para iniciar o bot.

![Texto Alternativo](https://github.com/arrudafdc/whatsapp-chatbot/blob/main/assets/qr-gen.png)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
