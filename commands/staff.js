module.exports = {
    name: 'staff',
    description: 'Adds user as staff to access staff chat and department chat',
    usage: '<dept_code>',
    execute(message, args) {
        if(args.length == 1) {
            const deptCode = args[0];

            if(deptCodeList.includes(deptCode)) {
                const staffRole = getRole(message.guild.roles, "Staff 2021");

                message.member.addRole(staffRole).catch(console.error);
                message.reply("welcome to staff! You should have access to staff channels now.");
            }
            else {
                message.reply("Invalid department code");
            }
        }
        else {
            message.reply("Invalid arguments");
        }

        message.delete();
    }
}

const deptCodeList = [
    "acc21",
    "aa21",
    "cos21",
    "dea21",
    "con21",
    "ind21",
    "pcg21",
    "tt21",
    "gr21",
    "mog21",
    "it21",
    "roh21",
    "le21",
    "mkt21",
    "pan21",
    "sos21",
    "ss21"
];

getRole = (roles, roleName) => {
    const gameRole = roles.find(role => role.name === roleName);
    return gameRole;
}