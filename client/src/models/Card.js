export default function Card({
    _id, description, dueDate, isArchived, name, labels, list, members, checklists,
} = {}) {
    this._id = _id; // String
    this.description = description; // String
    this.dueDate = dueDate; // Date
    this.isArchived = isArchived; // Boolean
    this.name = name; // String
    this.checklists = checklists; // Array(Checklist)
    this.labels = labels; // Array(Label)
    this.list = list; // List
    this.members = members; // Array(User)
}
