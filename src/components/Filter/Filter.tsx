import {type FilterProps} from '../../types/Components.types'
import './Filter.styles.scss'

const Filter = ({applyFilter, options, id}: FilterProps) => {
  return (
    <select
      id={id}
      onChange={(e) => {
        applyFilter(e.target.value)
      }}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.text}</option>
      ))
    }
    </select>
  )
}

export default Filter
