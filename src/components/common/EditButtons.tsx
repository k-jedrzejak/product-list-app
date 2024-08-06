import Button from "./Button";

interface EditButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

const EditButtons = ({ onSave, onCancel }: EditButtonsProps) => (
  <div>
    <Button className="btn-primary mt-2" onClick={onSave}>
      Save
    </Button>
    <Button className="btn-secondary mt-2 ms-2" onClick={onCancel}>
      Cancel
    </Button>
  </div>
);

export default EditButtons;
