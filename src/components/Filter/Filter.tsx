import { type FilterProps } from "../../types/Components.types";

const Filter = ({ applyFilter, options, id, customStyle }: FilterProps) => {
  return (
    <select
      id={id}
      onChange={(e) => {
        applyFilter(e.target.value);
      }}
      className={`rounded-[10px] p-2 border-2 ${customStyle}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Filter;
