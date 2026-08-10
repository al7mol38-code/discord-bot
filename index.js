require("dotenv").config();

const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const moment = require("moment-timezone");

const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const CHANNEL_ID = process.env.CHANNEL_ID;

function createMessage() {
  return `# 🌎 Server Times

🇸🇦 Saudi Arabia: ${moment().tz("Asia/Riyadh").format("HH:mm")}
🇯🇵 Tokyo: ${moment().tz("Asia/Tokyo").format("HH:mm")}
🇸🇬 Singapore: ${moment().tz("Asia/Singapore").format("HH:mm")}
🇦🇺 Sydney: ${moment().tz("Australia/Sydney").format("HH:mm")}
🇵🇱 Warsaw: ${moment().tz("Europe/Warsaw").format("HH:mm")}
🇧🇷 São Paulo: ${moment().tz("America/Sao_Paulo").format("HH:mm")}`;
}

client.once("clientReady", async () => {
  console.log(`${client.user.tag} جاهز`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  await channel.send(createMessage());

  setInterval(async () => {
    await channel.send(createMessage());
  }, 60 * 1000);
});

client.login(process.env.TOKEN);
