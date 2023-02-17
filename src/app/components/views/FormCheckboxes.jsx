import React from 'react'
import { validateShortAnswer } from '../../../helpers/validation';
const FormCheckboxes = ({data, formData, setFormData, setValidated}) => {

  const onChange = (evt) => { 
    let answers2 = formData[data.form_builder_section_id][data.id]['answer'] 
    if(answers2.findIndex((item)=>(item === parseInt(evt.currentTarget.value))) > -1){
      answers2 = answers2.filter((item)=>(item !== parseInt(evt.currentTarget.value)))
    }
    else{
      answers2 = [...answers2, parseInt(evt.currentTarget.value)];
    }
    let newFormData = formData;
    const valid = evt.currentTarget.value !== "" && data.validation.type !== undefined ? validateShortAnswer(data.validation, answers2) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:answers2, requiredError:false,  
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
      {(data.options.description_visible === 1 && data.description) && <div className="form-view-description">{data.description}</div>}
        <div className="ebs-options-view">
          {data.answers && data.answers.map((element,key) =>
            <label key={key} className="ebs-option-list d-flex align-items-center">
              <label className="ebs-option ebs-radio">
                <input name={`item_${data.index}`} type="checkbox" checked={(formData[data.form_builder_section_id][data.id]['answer'] !== undefined && formData[data.form_builder_section_id][data.id]['answer'].findIndex((item)=>(item == parseInt(element.id))) > -1) ? true : false} value={element.id} onChange={(e)=>{onChange(e)}} />
                <i className="material-icons"></i>
              </label>
              <div className="ebs-title">{element.label}</div>
            </label> 
          )}
           {formData[data.form_builder_section_id][data.id]['validationError'] === true && data.validation.custom_error}
           {formData[data.form_builder_section_id][data.id]['requiredError'] === true && <div className='ebs-error-container'>This question is required</div>}
     
      </div>
    </div>
  )
}
export default FormCheckboxes;