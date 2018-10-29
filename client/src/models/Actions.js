export default function Action({
    _id, data, date, user, type,
} = {}) {
    this._id = _id; // String
    this.data = data; // String
    this.date = date; // Date
    this.user = user; // User
    this.type = type; // ActionType
}
