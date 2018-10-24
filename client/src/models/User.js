export default function User(id, avatarUrl, bio, email, initials,
    nickname, password, notifs, teams) {
    this.id = id; // String
    this.avatarUrl = avatarUrl; // String
    this.bio = bio; // String
    this.email = email; // String
    this.initials = initials; // String
    this.nickname = nickname; // number
    this.password = password; // String
    this.notifs = notifs; // Array(Notification)
    this.teams = teams; // Array(Team)
}
