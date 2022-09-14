import React, {useState} from 'react';
const FormShortAnswer = ({data, formData, setFormData}) => {
  // const [shortAnswer, setShortAnswer] = useState(formData[data.form_builder_section_id].questions[data.id] ? formData[data.form_builder_section_id].questions[data.id] : "");

  const onChange = (evt) => { 
    // console.log(evt);
    let newFormData = formData;
    if(formData.length > 0 ){
       newFormData = {...formData, [data.form_builder_section_id]:{...formData.form_builder_section_id, [data.id]: evt.currentTarget.value}};
    }
    else{
       newFormData = {
        [data.form_builder_section_id]:{
          [data.id]: evt.currentTarget.value
        }
       };
    }
    setFormData(newFormData);
    console.log(newFormData);
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
              formData[data.form_builder_section_id][data.id] : ''}
            onChange={(e)=>{onChange(e)}}  
           />
        </div>
      </div>
    </div>
  )
}
export default FormShortAnswer;