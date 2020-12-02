<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord-premium-utils/"><img src="https://nodei.co/npm/discord-premium-utils.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/discord-premium-utils"><img src="https://img.shields.io/npm/v/discord-premium-utils.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-premium-utils"><img src="https://img.shields.io/npm/dt/discord-premium-utils.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Importing](#importing)
  - [CommonJS](#commonjs)
  - [ES6](#es6)
- [Example](#example)

## About

A simple Node.js package to use with discord.js to see if a user is subscribed to [Discord Nitro](https://discord.com/nitro)!

## Installation

* Node.js 12.0.0 or newer is required.
* [discord.js](https://www.npmjs.com/package/discord.js) is required.

`npm install discord-premium-utils`

## Importing

### CommonJS
```js
const PremiumUtils = require("discord-premium-utils");

// OR
const { hasNitro, probablyHasNitro, isBoosting } = require("discord-premium-utils");
```

### ES6
```js
import PremiumUtils from "discord-premium-utils";

// OR
import { hasNitro, probablyHasNitro, isBoosting } from "discord-premium-utils";
```

## Example

```js
import { Client } from "discord.js";
import { hasNitro, probablyHasNitro, isBoosting } from "discord-premium-utils";

const client = new Client();

client.on("ready", () => {
    console.log("Client is logged in!");
});

client.on("message", message => {
    if (message.content === "!checknitro") {
        if (hasNitro(message.author)) {
            message.channel.send("You have nitro!");
        } else if (probablyHasNitro(message.author)) {
            message.channel.send("You probably have nitro!");
        } else {
            message.channel.send("You probably don't have nitro!");
        }
    }

    if (message.content === "!checkboosting") {
        if (isBoosting(client, message.author)) {
            message.channel.send("You are server boosting!");
        } else {
            message.channel.send("You are probably not server boosting!");
        }
    }
});

client.login("token");
```