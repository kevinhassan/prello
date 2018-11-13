export default function Label({
    _id, color, name, board, cards,
} = {}) {
    this._id = _id; // String
    this.color = color; // String (6 digits hexadecimal color)
    this.name = name; // String
    this.board = board; // Board
    this.cards = cards; // Array(Card)
}
