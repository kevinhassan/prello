export default function Card(id, description, dueDate, index, isArchived, name, list, users) {
    this.id = id; // String
    this.description = description; // String
    this.dueDate = dueDate; // Date
    this.index = index; // Integer
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.list = list; // List
    this.users = users; // Array(User)
}
