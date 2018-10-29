export default function Board({
    _id, isArchived, name, labels, lists, privacy, teams,
} = {}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.labels = labels; // Array(Label)
    this.lists = lists; // Array(List)
    this.privacy = privacy; // PrivacyType
    this.teams = teams; // Array(Team)
}
