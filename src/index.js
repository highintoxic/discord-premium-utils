/// <reference path="../typings/index.d.ts" />

import { User } from "discord.js";
import { discriminatorArray } from "../constants/constants.js";

class PremiumUtils {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    /**
     * Method to determine if a user has nitro
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
        return false;
    }

    /**
     * Method to determine if a user probably has nitro based on their discriminator
     * @param {User} user - The target user
     */
    static probablyHasNitro(user) {
        if (!user) {
            throw new Error("No user was provided");
        } else if (!user.id) {
            throw new Error("No valid user was provided");
        }
        
        if (this.hasNitro(user)) return true;
        if (discriminatorArray.includes(user.discriminator)) return true;
        return false;
    }
}

const { hasNitro, probablyHasNitro } = PremiumUtils;

export {
    hasNitro,
    probablyHasNitro
}

export default PremiumUtils;