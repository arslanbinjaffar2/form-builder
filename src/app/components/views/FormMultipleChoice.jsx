import React from 'react'
import { validateShortAnswer } from '../../../helpers/validation';
const FormMultipleChoice = ({data, formData, setFormData, setValidated}) => {
  const onChange = (evt) => { 
    // console.log(evt);
    let newFormData = formData;
    const valid = evt.currentTarget.value !== "" ? validateShortAnswer(data.validation, evt.currentTarget.value) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          ['answer']:evt.currentTarget.value, ['requiredError']:false,  
          ['validationError']:!valid,  
          ['question_type']:data.type}}};

    console.log(newFormData);
    setFormData(newFormData);
    setValidated(valid);
  }
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description) && <div className="form-view-description">{data.description}</div>}
        <div className="ebs-options-view">
          {data.answers && data.answers.map((element, key) => (
            <label key={key} className="ebs-option-list d-flex align-items-center">
              <label className="ebs-option ebs-radio">
                <input name={`item_${data.index}`} type="radio" value={element.id} onChange={(e)=>{onChange(e)}} />
                <i className="material-icons"></i>
              </label>
              <div className="ebs-title">{element.label && element.label}</div>
            </label>
          ))}
          {formData[data.form_builder_section_id][data.id]['validationError'] === true && data.validation.custom_error}
          {formData[data.form_builder_section_id][data.id]['requiredError'] === true && "This question is required"}
      </div>
    </div>
  );
}
export default FormMultipleChoice;