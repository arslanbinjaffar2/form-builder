import React from 'react';
import { validateShortAnswer } from '../../../helpers/validation';
const FormLongAnswer = ({data, formData, setFormData, setValidated}) => {
  const handleTextaera = (evt) => {
    const element = evt.target;
    element.style.height = "35px";
    element.style.height = element.scrollHeight + "px";

    let newFormData = formData;
    const valid = evt.currentTarget.value !== "" && data.validation.type !== undefined ? validateShortAnswer(data.validation, evt.currentTarget.value) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:evt.currentTarget.value, requiredError:false,  
          validationError:!valid,  
          question_type:data.type}}};

    console.log(newFormData);
    setFormData(newFormData);
    setValidated(valid);
  }


  
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description !== "") && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-input-response">
          <textarea onChange={handleTextaera} placeholder="Your answer" type="text" value={formData[data.form_builder_section_id][data.id]['answer']}  />
          {formData[data.form_builder_section_id][data.id]['validationError'] === true && <div className='ebs-error-container'> {data.validation.custom_error} </div>}
          {formData[data.form_builder_section_id][data.id]['requiredError'] === true && <div className='ebs-error-container'>This question is required</div>}
        </div>
      </div>
    </div>
  )
}
export default FormLongAnswer;