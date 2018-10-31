/**
 * Check if the member is admin in the members collection
 * A user which is not in members is not authorized
 * A user which is in members need to be admin
 */
const isAdmin = async (user, members) => {
    const member = members.find(member => member._id.toString() === user.toString());
    if (!member) return false;
    return member.isAdmin;
};

module.exports = isAdmin;
