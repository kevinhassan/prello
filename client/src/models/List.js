export default function List({
    id, index, isArchived, name, boardId, cards,
}) {
    this.id = id; // String
    this.index = index; // Int
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.boardId = boardId; // String
    this.cards = cards; // Array(Card)
}
