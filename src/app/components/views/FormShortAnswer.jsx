import React, {useState} from 'react';
import {validateShortAnswer} from '../../../helpers/validation';
const FormShortAnswer = ({data, formData, setFormData, setValidated}) => {
  const [error, setError] = useState(false);

  const onChange = (evt) => { 
    // console.log(evt);
    let newFormData = formData;
    if(formData.length > 0 ){
       newFormData = {...formData, [data.form_builder_section_id]:{...formData[data.form_builder_section_id], [data.id]:{ ...data.id, ['answer']:evt.currentTarget.value}}};
    }
    else{
       newFormData = {
        [data.form_builder_section_id]:{
          [data.id]: {['answer']:evt.currentTarget.value}
        }
       };
    }
    setFormData(newFormData);
    const valid = validateShortAnswer(data.validation, evt.currentTarget.value);
    setValidated(valid);
    setError(!valid);
  }
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description)&& <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-input-response">
          <input placeholder="Your answer" type="text" 
            value={
              (formData[data.form_builder_section_id] && 
              formData[data.form_builder_section_id] && 
              formData[data.form_builder_section_id][data.id]) ? 
              formData[data.form_builder_section_id][data.id]['answer'] : ''}
            onChange={(e)=>{onChange(e)}}  
           />
           {error && data.validation.custom_error}
           {
              (formData[data.form_builder_section_id] && 
              formData[data.form_builder_section_id] && 
              formData[data.form_builder_section_id][data.id]) &&
              formData[data.form_builder_section_id][data.id]['error'] && "This question is required"}
        </div>
      </div>
    </div>
  )
}
export default FormShortAnswer;