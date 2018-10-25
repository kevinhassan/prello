export default function Card(id, description, dueDate, index, isArchived, name, labels, list, users) {
    this.id = id; // String
    this.description = description; // String
    this.dueDate = dueDate; // Date
    this.index = index; // Integer
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.labels = labels; // Array(Label)
    this.list = list; // List
    this.users = users; // Array(User)
}
