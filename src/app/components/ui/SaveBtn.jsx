import React from 'react'

const SaveBtn = ({children, ...rest}) => {
  return (
    <span {...rest} className="ebs-btn" ><i className="material-icons">save</i></span>

  )
}

export default SaveBtn