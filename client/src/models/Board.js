export default function Board({
    _id, isArchived, name, labels, lists, visibility, teams, members, owner, githubRepo,
} = {}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.visibility = visibility; // String
    this.labels = labels; // Array(Label)
    this.lists = lists; // Array(List)
    this.members = members; // Array({User, isAdmin: bool})
    this.githubRepo = githubRepo; // Object
    this.owner = owner; // User
    this.teams = teams; // Array(Team)
}
