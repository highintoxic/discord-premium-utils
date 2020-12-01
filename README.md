<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/bRCvFy9"><img src="https://img.shields.io/discord/222078108977594368?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discord-premium-utils"><img src="https://img.shields.io/npm/v/discord-premium-utils.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-premium-utils"><img src="https://img.shields.io/npm/dt/discord-premium-utils.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/discord-premium-utils/"><img src="https://nodei.co/npm/discord-premium-utils.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

# What is this?

A simple Node.js package to see if a user is subscribed to Discord Nitro!

# Installation

`npm install discord-premium-utils`

# Example

```js
import { Client } from "discord.js";
import PremiumUtils from "discord-premium-utils";

const client = new Client();

client.once("ready", () => {
    console.log("Client is logged in!");
});

client.on("message", message => {
    if (message.content === "!checkpremium") {
        if (PremiumUtils.hasNitro(message.author)) {
            message.channel.send("You have nitro!");
        } else if (PremiumUtils.probablyHasNitro(message.author)) {
            message.channel.send("You probably have nitro!");
        } else {
            message.channel.send("You probably don't have nitro!");
        }
    }
});

client.login("token");
```