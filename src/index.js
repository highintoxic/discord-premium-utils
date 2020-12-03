/// <reference path="../typings/index.d.ts" />

const { Client, User } = require("discord.js");
const { discriminatorArray } = require("../constants/constants.js");

/**
 * A simple Node.js package to see if a user is subscribed to Discord Nitro!
 */
class PremiumUtils {
    /**
     * This class may not be instantiated.
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
     * Method to see if a user has nitro based on some creteria
     * @param {User} user - The target user
     * @returns {boolean} Returns `true` if one of the criteria of this method is met
     * @example hasNitro(message.author);
     */
    static hasNitro(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id) {
            throw new Error("No valid user was provided");
        }

        if (user.bot) return false;

        if (user.avatar && user.avatar.startsWith("a_")) return true;
        if (user.flags && (user.flags.has("DISCORD_EMPLOYEE") || user.flags.has("PARTNERED_SERVER_OWNER"))) return true;
        if (user.presence.activities[0] && user.presence.activities.filter(activity => activity.emoji && activity.emoji.id).length > 0) return true;

        const animatedEmojiCheck = /(<a:[^:\s]+:[0-9]+>)+/g;

        if (user.lastMessage && user.lastMessage.content && animatedEmojiCheck.test(user.lastMessage.content)) return true;

        return false;
    }

    /**
     * Method to see if a user probably has nitro based on the previous method and their discriminator
     * @param {User} user - The target user
     * @returns {boolean} Returns `true` if one of the criteria of this or the previous method is met
     * @example probablyHasNitro(message.author);
     */
    static probablyHasNitro(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id || !user.discriminator) {
            throw new Error("No valid user was provided");
        }

        if (user.bot) return false;

        if (this.hasNitro(user)) return true;
        if (discriminatorArray.includes(user.discriminator)) return true;
        return false;
    }

    /**
     * A method to see if a user is server boosting based on if they are boosting any mutual servers with the specified client
     * @param {Client} client - The client to check the mutual boosting servers with
     * @param {User} user - The target user
     * @returns {boolean} Returns `true` if the target user is boosting any mutual server with the specified client
     * @example isBoosting(client, message.author);
     */
    static isBoosting(client, user) {
        if (!client) {
            throw new Error("No client was provided");
        } else if (!client.id || !client.guilds) {
            throw new Error("No valid client was provided");
        }

        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id) {
            throw new Error("No valid user was provided");
        }

        if (user.bot) return false;

        if (client.guilds.cache.filter(guild => guild.member(user) && guild.member(user).premiumSince).size > 0) return true;
        return false;
    }

    /**
     * The version of the package
     * @readonly
     */
    static get version() {
        return require("../package.json").version;
    }

    /**
     * The version of discord.js this package is using
     * @readonly
     */
    static get discordjs_version() {
        return require("../package.json").devDependencies["discord.js"].slice(1);
    }
}

module.exports = PremiumUtils;