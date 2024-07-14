interface ActionButtonsProps {
  onSaveClick: () => void;
  onCancelClick: () => void;
}

const ActionButtons = ({ onSaveClick, onCancelClick }: ActionButtonsProps) => {
  return (
    <>
      <button
        className="btn btn-primary mt-2"
        onClick={onSaveClick}
      >
        Save
      </button>
      <button
        className="btn btn-secondary mt-2 ms-2"
        onClick={onCancelClick}
      >
        Cancel
      </button>
    </>
  );
};

export default ActionButtons;
