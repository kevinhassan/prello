export default function Checklist({ _id, name, card, checklistItems } = {}) {
    this._id = _id; // String
    this.name = name; // String
    this.card = card; // Card
    this.checklistItems = checklistItems; // Array(ChecklistItem)
}
