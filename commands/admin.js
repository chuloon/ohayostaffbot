module.exports = {
    name: 'admin',
    description: 'Admin controls to manage staff permissions. If you need to use this help command, you probably can\'t use it anyway. kthxbye',
    usage: 'add/delete <year-number>',
    execute(message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        if(args.length == 2) {
            if(args[0].toLowerCase() == "add") {
                createStaffRoles(message, args[1]);
            }
            else if (args[0].toLowerCase() == "delete") {
                deleteStaffRoles(message, args[1]);
            }
        }
        else {
            message.reply("Invalid arguments");
        }

        message.delete();
    }
}

deleteStaffRoles = (message, yearNum) => {
    const staffRoleName = "Staff " + yearNum;
    const shiftLeadRoleName = "Shift Lead " + yearNum;

    const staffRole = getRole(message.guild.roles, staffRoleName);
    const shiftLeadRole = getRole(message.guild.roles, shiftLeadRoleName);

    staffRole.delete();
    shiftLeadRole.delete();

    deleteChannel(message.guild.channels, "staff-announcements-" + yearNum);
    deleteChannel(message.guild.channels, "staff-chat-" + yearNum);
    deleteChannel(message.guild.channels, "staff-helprequest-" + yearNum);
    deleteChannel(message.guild.channels, "live-events-" + yearNum);
    deleteChannel(message.guild.channels, "tech-support-" + yearNum);
}

createStaffRoles = (message, yearNum) => {
    const staffRoleData = {
        name: "Staff " + yearNum,
        color: '#1ABC9C',
        mentionable: false
    };

    const staffLeadRoleData = {
        name: "Shift Lead " + yearNum,
        color: '#11806A',
        mentionable: false
    };

    message.guild.createRole(staffRoleData).then((role) => {
        createStaffChannels(message, yearNum);
    });
    message.guild.createRole(staffLeadRoleData);
}

createStaffChannels = (message, yearNum) => {
    const everyoneRole = getRole(message.guild.roles, "@everyone");
    const staffRole = getRole(message.guild.roles, "Staff " + yearNum);

    const staffChannelNames = [
        "staff-announcements-" + yearNum,
        "staff-chat-" + yearNum,
        "staff-helprequest-" + yearNum,
        "live-events-" + yearNum,
        "tech-support-" + yearNum,
    ]

    for(let i = 0; i < staffChannelNames.length; i++) {
        message.guild.createChannel(staffChannelNames[i], "text").then((channel) => {
            channel.overwritePermissions(everyoneRole, {
                VIEW_CHANNEL: false
            });
    
            channel.overwritePermissions(staffRole, {
                VIEW_CHANNEL: true
            });
    
            addChannelToCategory(message, channel);
        });
    }
}

addChannelToCategory = (message, channel) => {
    const category = message.guild.channels.find(c => c.name == "Ohayo Staff" && c.type == "category");
    if(category && channel) channel.setParent(category);
}

deleteChannel = (channels, channelName) => {
    channels.forEach((channel) => {
        if(channel.name == channelName) {
            channel.delete();
        }
    });
}

getRole = (roles, roleName) => {
    const gameRole = roles.find(role => role.name === roleName);
    return gameRole;
}