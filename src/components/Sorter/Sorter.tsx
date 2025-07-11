import { type SorterProps } from "../../types/Components.types";
import "./Sorter.styles.scss";

const Sorter = ({ sortBy, options, id }: SorterProps) => {
  return (
    <select
      id={id}
      onChange={(e) => {
        sortBy(e.target.value);
      }}
      className="h-[2em] rounded-[10px] cursor-pointer shadow-sm border text-black dark:text-dark-50 dark:bg-dark-700"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Sorter;
