interface ActionButtonsProps {
  onSaveClick: () => void;
  onCancelClick: () => void;
  isSaving: boolean;
}

const ActionButtons = ({ onSaveClick, onCancelClick, isSaving }: ActionButtonsProps) => {
  return (
    <>
      <button
        className="btn btn-primary mt-2"
        onClick={onSaveClick}
        disabled={isSaving}
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
