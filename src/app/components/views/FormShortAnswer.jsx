import React from 'react';
const FormShortAnswer = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title} {data.required && <span className="required">*</span>}
      </div>
      {data.descVisible && data.description && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-input-response">
          <input placeholder="Your answer" type="text"  />
        </div>
      </div>
    </div>
  )
}
export default FormShortAnswer;