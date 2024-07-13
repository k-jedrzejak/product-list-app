interface EditButtonProps {
  onEditClick: () => void;
  name: string;
}

const EditButton = ({ onEditClick, name }: EditButtonProps) => {
  return (
    <button
      className="btn btn-link ms-2"
      onClick={onEditClick}
    >
      Edit {name}
    </button>
  );
};

export default EditButton;
