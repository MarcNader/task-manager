import { useClickOutside } from "../../hooks/useClickOutside";
import EditIcon from "../../assets/icons/edit.png";
import DeleteIcon from "../../assets/icons/delete.png";
import { DropdownProps } from "../../types/Components.types";

const DropdownMenu: React.FC<DropdownProps> = ({
  isVisible,
  onEdit,
  onDelete,
  onClose,
  iconRef,
}) => {
  const dropdownRef = useClickOutside(onClose, iconRef);

  return isVisible ? (
    <div
      ref={dropdownRef}
      className="absolute bg-[rgba(230,226,226,0.641)] top-[40px] right-[12px] p-[10px] rounded-md"
    >
      <div
        onClick={onEdit}
        className="flex items-center h-[50%] hover:bg-[#EFF4FA] cursor-pointer"
      >
        <img src={EditIcon} className="w-[15px] mr-[0.5em]" />
        Edit
      </div>
      <div
        onClick={onDelete}
        className="flex items-center h-[50%] hover:bg-[#EFF4FA] cursor-pointer"
      >
        <img src={DeleteIcon} className="w-[15px] mr-[0.5em]" />
        Delete
      </div>
    </div>
  ) : null;
};

export default DropdownMenu;
