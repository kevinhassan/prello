export default function Team({
    _id, description, isVisible, name, boardsId, users,
} = {}) {
    this._id = _id; // String
    this.description = description; // String
    this.isVisible = isVisible; // Boolean
    this.name = name; // String
    this.boardsId = boardsId; // String
    this.users = users; // Array(User)
}
