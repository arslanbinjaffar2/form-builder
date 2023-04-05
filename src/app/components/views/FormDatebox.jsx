import React, { useState, useEffect } from 'react';
import Select  from "react-select";
import moment from 'moment';
import DateTime from 'react-datetime';

const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderRadius: 0,
    border: 'none',
    padding: 0,
    color: '#444',
    boxShadow: null
  })
};

const FormDatebox = ({data, setFormData, formData, setValidated}) => {

 const handleCheckDate = (date) => {
    let format = `MM/DD${data.options.year === 1 ? '/YYYY': ''} ${data.options.time === 1 ? "hh:mm A" : ''}`
    console.log(format);
    let newFormData = formData;
    newFormData = {...formData,
      [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
       [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
         answer:date.format(format), requiredError:false,  
         validationError:false,  
         question_type:data.type}}};
    setFormData(newFormData);
  };

  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description) && <div className="form-view-description">{data.description}</div>}
        <div className="ebs-options-view">
        <DateTime
            input={true}
            dateFormat={data.options.year === 1 ? 'MM/DD/YYYY' : 'MM/DD'}
            timeFormat={data.options.time === 1} 
            value={formData[data.form_builder_section_id][data.id]['answer'] !== '' ? moment(new Date(formData[data.form_builder_section_id][data.id]['answer'])) : ""}
            onChange={handleCheckDate}
          />
           {formData[data.form_builder_section_id][data.id]['validationError'] === true && "Invalid Date"}
           {formData[data.form_builder_section_id][data.id]['requiredError'] === true && <div className='ebs-error-container'>This question is required</div>}
      </div>
    </div>
  )
}

export default FormDatebox