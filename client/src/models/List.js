export default function List({
    _id, isArchived, name, boardId, cards,
}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.boardId = boardId; // String
    this.cards = cards; // Array(Card)
}
