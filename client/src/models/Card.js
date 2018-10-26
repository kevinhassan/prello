export default function Card({
    id, description, dueDate, isArchived, name, labels, list, users,
} = {}) {
    this.id = id; // String
    this.description = description; // String
    this.dueDate = dueDate; // Date
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.labels = labels; // Array(Label)
    this.list = list; // List
    this.users = users; // Array(User)
}
