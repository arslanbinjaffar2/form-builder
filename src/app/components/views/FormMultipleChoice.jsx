import React from 'react'
const FormMultipleChoice = ({data, formData, setFormData, setValidated, setNextSection}) => {
  const onChange = (evt, next_section) => { 
    // console.log(evt);
    let newFormData = formData;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:parseInt(evt.currentTarget.value), requiredError:false,  
          validationError:false,  
          question_type:data.type}}};
    if(data.options.section_based === 1){
      setNextSection(next_section);
    } 
    setFormData(newFormData);
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
                <input name={`item_${data.id}`} type="radio" checked={(formData[data.form_builder_section_id][data.id]['answer'] !== undefined && formData[data.form_builder_section_id][data.id]['answer'] === element.id) ? true : false} value={element.id} onChange={(e)=>{onChange(e, element.next_section)}} />
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