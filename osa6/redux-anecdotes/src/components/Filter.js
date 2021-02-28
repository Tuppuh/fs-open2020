import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        const filter = event.target.value
        props.filterChange(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter