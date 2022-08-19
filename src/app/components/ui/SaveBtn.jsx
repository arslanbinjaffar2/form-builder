import React from 'react'

const SaveBtn = ({children, ...rest}) => {
  return (
    <button {...rest} className="ebs-save-btn" >{children}</button>

  )
}

export default SaveBtn