interface EditButtonProps {
  onEditClick: () => void;
  name: string;
}

const EditButton = ({ onEditClick, name }: EditButtonProps) => {
  return (
    <button
      className="btn btn-link btn-sm"
      onClick={onEditClick}
    >
      {name === "image" ? `Edit ${name}` : "Edit"}
  </button>
  );
};

export default EditButton;
