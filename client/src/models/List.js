export default function List({
    _id, isArchived, name, board_id, cards,
}) {
    this._id = _id; // String
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.board_id = board_id; // String
    this.cards = cards; // Array(Card)
}
