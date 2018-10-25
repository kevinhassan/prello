export default function User({
    id, avatarUrl, biography, email, initials,
    nickname, password, notifs, teams,
} = {}) {
    this.id = id; // String
    this.avatarUrl = avatarUrl; // String
    this.biography = biography; // String
    this.email = email; // String
    this.initials = initials; // String
    this.nickname = nickname; // number
    this.password = password; // String
    this.notifs = notifs; // Array(Notification)
    this.teams = teams; // Array(Team)
}
