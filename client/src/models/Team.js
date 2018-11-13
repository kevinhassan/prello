export default function Team({
    _id, avatarUrl, description, isVisible, name, boards, members,
} = {}) {
    this._id = _id; // String
    this.avatarUrl = avatarUrl; // String
    this.description = description; // String
    this.isVisible = isVisible; // Boolean
    this.name = name; // String
    this.boards = boards; // Array[Board]
    this.members = members; // Array(User)
}
