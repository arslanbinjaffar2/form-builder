import React from 'react';
const FormTextBlock = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title}
      </div>
      {data.description !== "" && <div className="form-view-description">{data.description}</div>}
    </div>
  )
}
export default FormTextBlock;