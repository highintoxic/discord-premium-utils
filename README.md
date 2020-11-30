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