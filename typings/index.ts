/// <reference path="index.d.ts" />

import { Client } from "discord.js";
import PremiumUtils from "discord-premium-utils";

const client: Client = new Client();

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