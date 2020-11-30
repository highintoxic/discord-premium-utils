declare module 'discord-premium-utils' {
    import { User } from "discord.js";
    class PremiumUtils {
        public static hasNitro(user: User): boolean;
        public static probablyHasNitro(user: User): boolean;
    }

    export = PremiumUtils
}