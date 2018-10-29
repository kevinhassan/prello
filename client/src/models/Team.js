export default function Team({
    _id, description, isVisible, name, boards_id, users,
} = {}) {
    this._id = _id; // String
    this.description = description; // String
    this.isVisible = isVisible; // Boolean
    this.name = name; // String
    this.boards_id = boards_id; // String
    this.users = users; // Array(User)
}
