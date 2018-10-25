export default function Team({
    id, description, isVisible, name, boardsId, users,
} = {}) {
    this.id = id; // String
    this.description = description; // String
    this.isVisible = isVisible; // Boolean
    this.name = name; // String
    this.boardsId = boardsId; // String
    this.users = users; // Array(User)
}
