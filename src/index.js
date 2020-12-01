/// <reference path="../typings/index.d.ts" />

import { Client, User } from "discord.js";
import { discriminatorArray } from "../constants/constants.js";

class PremiumUtils {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
     * Method to see if a user has nitro based on some creteria
     * @param {User} user - The target user
     */
    static hasNitro(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id) {
            throw new Error("No valid user was provided");
        }

        if (user.avatar && user.avatar.startsWith("a_")) return true;
        if (user.flags && (user.flags.has("DISCORD_EMPLOYEE") || user.flags.has("PARTNERED_SERVER_OWNER"))) return true;
        if (user.presence.activities[0] && user.presence.activities.filter(activity => activity.emoji && activity.emoji.id)) return true;
        return false;
    }

    /**
     * Method to see if a user probably has nitro based on the previous method and their discriminator
     * @param {User} user - The target user
     */
    static probablyHasNitro(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id || !user.discriminator) {
            throw new Error("No valid user was provided");
        }

        if (this.hasNitro(user)) return true;
        if (discriminatorArray.includes(user.discriminator)) return true;
        return false;
    }

    /**
     * A method to see if a user is server boosting based on if they are boosting any mutual servers with the specified client
     * @param {Client} client - The client to check the mutual boosting servers with
     * @param {User} user - The target user
     */
    static isBoosting(client, user) {
        if (!client) {
            throw new Error("No client was provided");
        } else if (!client.guilds) {
            throw new Error("No valid client was provided");
        }

        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id) {
            throw new Error("No valid user was provided");
        }

        if (client.guilds.cache.filter(guild => guild.member(user) && guild.member(user).premiumSince).size > 0) return true;
        return false;
    }
}

const { hasNitro, probablyHasNitro, isBoosting } = PremiumUtils;

export {
    hasNitro,
    probablyHasNitro,
    isBoosting
}

export default PremiumUtils;