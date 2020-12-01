import { Client, User } from "discord.js";

declare module "discord-premium-utils" {
    class PremiumUtils {
        /**
         * Method to see if a user has nitro based on some creteria
         * @param user - The target user
         */
        public static hasNitro(user: User): boolean;
        /**
         * Method to see if a user probably has nitro based on the previous method and their discriminator
         * @param user - The target user
         */
        public static probablyHasNitro(user: User): boolean;
        /**
         * A method to see if a user is server boosting based on if they are boosting any mutual servers with the specified client
         * @param client - The client to check the mutual boosting servers with
         * @param user - The target user
         */
        public static isBoosting(client: Client, user: User): boolean;
    }

    export = PremiumUtils
}