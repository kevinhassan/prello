export default function Action(id, data, date, user, type) {
    this.id = id; // String
    this.data = data; // String
    this.date = date; // Date
    this.user = user; // User
    this.type = type; // ActionType
}
