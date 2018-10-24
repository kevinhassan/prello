export default function Card(id, description, isArchived, dueDate, index) {
    this.id = id; // String
    this.description = description; // String
    this.dueDate = dueDate; // Date
    this.index = index; // Integer
    this.isArchived = isArchived; // Boolean
}
