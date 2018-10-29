export default function CheckItem({
    _id, isChecked = false, name, checklist,
} = {}) {
    this._id = _id; // String
    this.isChecked = isChecked; // Boolean
    this.name = name; // String
    this.checklist = checklist; // Checklist
}
