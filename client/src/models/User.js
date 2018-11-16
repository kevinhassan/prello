export default function User({
    _id, avatarUrl, biography, email, fullName, initials,
    password, username, notifications, boards, teams, passwordResetExpires, passwordResetToken, github,
} = {}) {
    this._id = _id; // String
    this.avatarUrl = avatarUrl; // String
    this.biography = biography; // String
    this.email = email; // String
    this.fullName = fullName; // String
    this.initials = initials; // String
    this.password = password; // String
    this.passwordResetExpires = passwordResetExpires; // String
    this.passwordResetToken = passwordResetToken; // String
    this.github = github; // Object
    this.username = username; // String
    this.boards = boards; // Array(Board)
    this.notifications = notifications; // Array(Notification)
    this.teams = teams; // Array(Team)
}
