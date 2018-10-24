export default function List(id, index, isArchived, name, cards, boardId) {
    this.id = id; // String
    this.index = index; // Int
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.cards = cards; // Array(Card)
    this.boardId = boardId; // String
}
