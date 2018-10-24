export default function CheckItem(id, name, isChecked = false, checklist) {
    this.id = id; // String
    this.isChecked = isChecked; // Boolean
    this.name = name; // String
    this.checklist = checklist; // Checklist
}
