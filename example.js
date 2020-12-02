import { Client } from "discord.js";
import { hasNitro, probablyHasNitro, isBoosting } from "./src/index.js";

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