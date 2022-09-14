import React from 'react';
const FormLongAnswer = ({data}) => {
  const handleTextaera = (e) => {
    const element = e.target;
    element.style.height = "35px";
    element.style.height = element.scrollHeight + "px";
  }
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-input-response">
          <textarea onChange={handleTextaera} placeholder="Your answer" type="text"  />
        </div>
      </div>
    </div>
  )
}
export default FormLongAnswer;