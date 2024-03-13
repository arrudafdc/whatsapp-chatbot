const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

let isFirstMessage = true;
let chatBotOn = true;

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", handleIncomingMessage);

async function handleIncomingMessage(message) {
  const isClientMessage = message.id.remote === "seuIdAqui" && !message.fromMe;

  const phraseToEndServiceByClient =
    "Vou finalizar o atendimento. Obrigado por entrar em contato!";

  if (!chatBotOn) {
    if (message.fromMe && message.body === phraseToEndServiceByClient) {
      chatBotOn = true;
      isFirstMessage = true;
    } else return;
  }

  if (isClientMessage) {
    await handleClientMessage(message);
  }
}

async function handleClientMessage(message) {
  if (isFirstMessage) {
    isFirstMessage = false;
    await sendInitialMessage(message);
  } else {
    switch (message.body) {
      case "1":
        await sendServiceInfo(message);
        break;
      case "2":
        await sendEventInfo(message);
        break;
      case "3":
        await sendPhotoInfo(message);
        break;
      case "4":
        await redirectToAttendant(message);
        break;
      case "5":
        endChat(message);
        break;
      default:
        await sendInvalidOptionMessage(message);
        break;
    }
  }
}

async function sendInitialMessage(message) {
  await message.reply(
    "Olá! Obrigado por entrar em contato. Por favor, digite o número da opção sobre o que você gostaria de falar.\n\n1: Serviços e Orçamentos\n2: Ingressos e Eventos\n3: Cade minhas fotos?\n4: Falar com atendente\n5: Finalizar conversa"
  );
}

async function sendServiceInfo(message) {
  await message.reply(
    "Trabalhamos a mais de 20 anos com cobertura fotográfica e divulgação de eventos e marcas. Para fornecer um orçamento adequado, precisamos entender melhor suas necessidades. Por favor, digite *4* para falar com um de nossos atendentes e discutir sua demanda."
  );
}

async function sendEventInfo(message) {
  await message.reply(
    "Infezlimente não vendemos mais ingressos. No entanto, você pode conferir tudo que rola na cidade através da nossa agenda cultural: https://www.maceio40graus.com.br/agenda/"
  );
}

async function sendPhotoInfo(message) {
  await message.reply(
    "Nossas fotos geralmente são publicadas dentro de 1 a 2 dias úteis. Se o prazo já tiver passado, por favor, digite *4* para entrar em contato conosco e resolvermos isso para você."
  );
}

async function redirectToAttendant(message) {
  chatBotOn = false;
  await message.reply(
    "Por favor, aguarde enquanto você é redirecionado para um de nossos atendentes."
  );
}

async function endChat(message) {
  isFirstMessage = true;
  await message.reply("Obrigado por entrar em contato!");
}

async function sendInvalidOptionMessage(message) {
  await message.reply(
    "Desculpe, não entendi. Por favor, digite o número da opção sobre o que você gostaria de falar.\n\n1: Serviços e Orçamentos\n2: Ingressos e Eventos\n3: Cade minhas fotos?\n4: Falar com atendente\n5: Finalizar conversa"
  );
}

client.initialize();
