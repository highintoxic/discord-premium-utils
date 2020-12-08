const { User } = require("discord.js");
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
        } else if (!user.id || !user.presence) {
            throw new Error("No valid user was provided");
        }

        if (user.bot) return false;

        if (user.avatar && user.avatar.startsWith("a_")) return true;
        if (user.flags && (user.flags.has("DISCORD_EMPLOYEE") || user.flags.has("PARTNERED_SERVER_OWNER"))) return true;
        if (user.presence.activities[0] && user.presence.activities.filter(activity => activity.emoji && activity.emoji.id).length > 0) return true;

        const animatedEmojiCheck = /(<a:[^:\s]+:[0-9]+>)+/g;

        if (user.lastMessage && (user.lastMessage.createdAt.getMonth() === new Date().getMonth() && user.lastMessage.createdAt.getDate() === new Date().getDate()) && user.lastMessage.content && animatedEmojiCheck.test(user.lastMessage.content)) return true;

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
        if (this.isBoosting(user)) return true;
        if (discriminatorArray.includes(user.discriminator)) return true;
        return false;
    }

    /**
     * A method to see if a user is server boosting based on if they are boosting any mutual servers with the client they are instantiated with
     * @param {User} user - The target user
     * @returns {boolean} Returns `true` if the target user is boosting any mutual server with the client they are instantiated with
     * @example isBoosting(message.author);
     */
    static isBoosting(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id || !user.client) {
            throw new Error("No valid user was provided");
        }

        if (user.bot) return false;

        if (user.client.guilds.cache.filter(guild => guild.member(user) && guild.member(user).premiumSince).size > 0) return true;
        return false;
    }

    /**
     * The version of the package
     * @type {string}
     * @readonly
     */
    static get version() {
        return require("../package.json").version;
    }

    /**
     * The version of discord.js this package is using
     * @type {string}
     * @readonly
     */
    static get discordjs_version() {
        return require("../package.json").dependencies["discord.js"].slice(1);
    }
}

module.exports = PremiumUtils;