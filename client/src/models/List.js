export default function List({
    id, isArchived, name, boardId, cards,
}) {
    this.id = id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.boardId = boardId; // String
    this.cards = cards; // Array(Card)
}
