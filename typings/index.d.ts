declare module "discord-premium-utils" {
    import { Client, User } from "discord.js";

    /**
     * A simple Node.js package to see if a user is subscribed to Discord Nitro!
     */
    class PremiumUtils {
        /**
         * This class may not be instantiated.
         */
        constructor()

        /**
         * Method to see if a user has nitro based on some creteria
         * @param user - The target user
         * @returns Returns `true` if one of the criteria of this method is met
         * @example hasNitro(message.author);
         */
        public static hasNitro(user: User): boolean;

        /**
         * Method to see if a user probably has nitro based on the previous method and their discriminator
         * @param user - The target user
         * @returns Returns `true` if one of the criteria of this or the previous method is met
         * @example probablyHasNitro(message.author);
         */
        public static probablyHasNitro(user: User): boolean;
        
        /**
         * A method to see if a user is server boosting based on if they are boosting any mutual servers with the specified client
         * @param client - The client to check the mutual boosting servers with
         * @param user - The target user
         * @returns Returns `true` if the target user is boosting any mutual server with the specified client
         * @example isBoosting(client, message.author);
         */
        public static isBoosting(client: Client, user: User): boolean;

        /**
         * The version of the package
         */
        public static readonly version: string;
    }

    export = PremiumUtils;
}