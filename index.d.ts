import { User } from "discord.js";

declare class PremiumUtils {
    public static hasNitro(user: User): boolean;
    public static probablyHasNitro(user: User): boolean;
}

export = PremiumUtils;