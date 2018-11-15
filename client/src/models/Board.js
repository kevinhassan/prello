export default function Board({
    _id, isArchived, name, labels, lists, visibility, teams, members, owner, boardGithubRepo,
} = {}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.visibility = visibility; // String
    this.boardGithubRepo = boardGithubRepo; // Object {name, url, private} : {String, String, Boolean}
    this.labels = labels; // Array(Label)
    this.lists = lists; // Array(List)
    this.members = members; // Array({User, isAdmin: bool})
    this.owner = owner; // User
    this.teams = teams; // Array(Team)
}
