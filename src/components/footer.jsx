import React from 'react'
import FilterLink from '../containers/filterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_SENT">
      send
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_SUPPORT">
      Completed
    </FilterLink>
  </p>
)

export default Footer