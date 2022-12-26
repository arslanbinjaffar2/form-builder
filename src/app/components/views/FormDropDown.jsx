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
    maxWidth: 350,
    textOverflow: 'ellipsis'

  })
};



const FormDropDown = ({data, formData, setFormData, setValidated}) => {
  const onChange = (evt) => { 
    // console.log(evt);
    let newFormData = formData;
    const valid = evt.id !== "" && data.validation.type !== undefined ? validateShortAnswer(data.validation, evt.id) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:parseInt(evt.id), requiredError:false,  
          validationError:!valid,  
          question_type:data.type}}};

    console.log(newFormData);
    setFormData(newFormData);
    setValidated(valid);
  }
  console.log(formData[data.form_builder_section_id][data.id]['answer']);
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description) && <div className="form-view-description">{data.description}</div>}
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
        options={data.answers}
        defaultValue={formData[data.form_builder_section_id][data.id]['answer'] !== undefined ? data.answers.find((answer)=>(parseInt(answer.id) === parseInt(formData[data.form_builder_section_id][data.id]['answer']))) : null}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          display: 'none',
          colors: {
            ...theme.colors,
            primary25: '#F4F4F4',
            primary: '#E39840',
          },
        })}/>
      </div>
    </div>
  )
}
export default FormDropDown;