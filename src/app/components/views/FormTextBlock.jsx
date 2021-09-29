import React from 'react';
const FormTextBlock = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title} {data.required && <span className="required">*</span>}
      </div>
      {data.descVisible && data.desc && <div className="form-view-description">{data.desc}</div>}
    </div>
  )
}
export default FormTextBlock;