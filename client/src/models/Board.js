export function Board(id, name, isArchieved, lists, labels, teams, privacy) {
    this.id = id;                    // String
    this.name = name;                // String
    this.isArchieved = isArchieved;  // Boolean
    this.lists = lists;              // Array(List)
    this.labels = labels;            // Array(Label)
    this.teams = teams;              // Array(Team)
    this.privacy = privacy;          // PrivacyType
}