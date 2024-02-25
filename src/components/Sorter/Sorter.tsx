import {type SorterProps} from '../../types/Components.types'
import './Sorter.styles.scss'

const Sorter = ({sortBy, options, id}: SorterProps) => {
  return (
    <select
      id={id}
      onChange={(e) => {
        sortBy(e.target.value)
      }}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.text}</option>
      ))
        }
    </select>
  )
}

export default Sorter
