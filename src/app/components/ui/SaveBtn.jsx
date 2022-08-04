import React from 'react'

const SaveBtn = ({children, ...rest}) => {
  return (
    <button {...rest} >{children}</button>

  )
}

export default SaveBtn