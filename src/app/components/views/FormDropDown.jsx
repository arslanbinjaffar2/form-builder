import React from 'react';
import { validateShortAnswer } from '../../../helpers/validation';
import Select from "react-select";
const customStyles = {
  control: base => ({
    ...base,
    height: 45,
    minHeight: 45,
    maxWidth: 200,
    borderRadius: 4,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    padding: 0,
    color: '#444',
    boxShadow: null
  }),
  option: (styles) =>( {
    ...styles,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '100%',
    textOverflow: 'ellipsis'

  })
};



const FormDropDown = ({data, formData, setFormData, setValidated, setNextSection}) => {
  
  const onChange = (evt) => { 
    console.log(evt);
    const selectedAnswer = data.answers.find((answer)=>(parseInt(answer.id) === parseInt(evt.value))); 
    let newFormData = formData;
    const valid = evt.id !== "" && data.validation.type !== undefined ? validateShortAnswer(data.validation, evt.id) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:parseInt(evt.value), requiredError:false,  
          validationError:!valid,  
          question_type:data.type}}};

    //console.log(newFormData);
    setFormData(newFormData);
    setValidated(valid);
    if(data.options.section_based === 1){
      setNextSection(selectedAnswer.next_section);
    } 
  }

const answer = formData[data.form_builder_section_id][data.id]['answer'] !== undefined ? data.answers.find((answer)=>(parseInt(answer.id) === parseInt(formData[data.form_builder_section_id][data.id]['answer']))) : null;
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description !== "") && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
      <Select
        menuColor='red'
        maxMenuHeight="1"
        menuPlacement="auto"
        placeholder="Choose"
        isSearchable={false}
        styles={customStyles}
        components={{ IndicatorSeparator: () => null }}
        onChange={(item)=> onChange(item)}
        options={data.answers.map((item)=>({label:item.label, value:item.id}))}
        defaultValue={(answer !== null && answer !== undefined) ? {label:answer.label, value:answer.id}: null}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          display: 'none',
          colors: {
            ...theme.colors,
            primary25: '#F4F4F4',
            primary: '#E39840',
          },
        })}
        />
        {formData[data.form_builder_section_id][data.id]['requiredError'] && <div className='ebs-error-container'>This question is required</div>}
      </div>
    </div>
  )
}
export default FormDropDown;