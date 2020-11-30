function hasNitro(user) {
    user.fetch();
    user.fetchFlags();
    if (user.avatar && user.avatar.startsWith("a_")) return true;
    if (user.flags && (user.flags.has("DISCORD_EMPLOYEE") || user.flags.has("PARTNERED_SERVER_OWNER"))) return true;
    return false;
}

module.exports.hasNitro = hasNitro;