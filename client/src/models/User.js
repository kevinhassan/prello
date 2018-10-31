export default function User({
    _id, avatarUrl, biography, email, fullName, initials,
    password, username, notifs, teams,
} = {}) {
    this._id = _id; // String
    this.avatarUrl = avatarUrl; // String
    this.biography = biography; // String
    this.email = email; // String
    this.fullName = fullName; // String
    this.initials = initials; // String
    this.password = password; // String
    this.username = username; // String
    this.notifs = notifs; // Array(Notification)
    this.teams = teams; // Array(Team)
}
