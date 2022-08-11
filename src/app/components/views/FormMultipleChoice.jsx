import React from 'react'

const FormMultipleChoice = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title} {data.required && <span className="required">*</span>}
      </div>
      {data.descVisible && data.description && <div className="form-view-description">{data.description}</div>}
        <div className="ebs-options-view">
          {data.options && data.options.choices.map((element, key) => (
            <label key={key} className="ebs-option-list d-flex align-items-center">
              <label className="ebs-option ebs-radio">
                <input name={`item_${data.index}`} type="radio" />
                <i className="material-icons"></i>
              </label>
              <div className="ebs-title">{element.label}</div>
            </label>
          ))}
        {data.options.add_other && (
          <label className="ebs-option-list d-flex align-items-center">
            <label className="ebs-option ebs-radio">
              <input name={`item_${data.index}`} type="radio" />
              <i className="material-icons"></i>
            </label>
            <div className="ebs-title ebs-add-another">Other</div>
            <div className="ebs-input-field"><input type="text"  /></div>
          </label>
        )}
      </div>
    </div>
  );
}
export default FormMultipleChoice;