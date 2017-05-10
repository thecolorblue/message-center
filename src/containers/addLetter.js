import React from 'react'
import { connect } from 'react-redux'
import { addLetter } from '../actions'

let AddLetter = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addLetter(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Letter
        </button>
      </form>
    </div>
  )
}
AddLetter = connect()(AddLetter)

export default AddLetter