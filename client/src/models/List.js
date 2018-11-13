export default function List({
    _id, isArchived = false, name, board, cards,
}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.board = board; // Board
    this.cards = cards; // Array(Card)
}
