export default function Board({
    id, isArchived, name, labels, lists, privacy, teams,
} = {}) {
    this.id = id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.labels = labels; // Array(Label)
    this.lists = lists; // Array(List)
    this.privacy = privacy; // PrivacyType
    this.teams = teams; // Array(Team)
}
