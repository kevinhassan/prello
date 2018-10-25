export default function CheckItem({
    id, isChecked = false, name, checklist,
} = {}) {
    this.id = id; // String
    this.isChecked = isChecked; // Boolean
    this.name = name; // String
    this.checklist = checklist; // Checklist
}
