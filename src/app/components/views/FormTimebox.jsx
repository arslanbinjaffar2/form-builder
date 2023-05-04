import React, { useState, useEffect, useRef } from 'react';
import Select  from "react-select";
import moment from 'moment/moment';
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

const FormTimebox = ({data,  setFormData, formData}) => {
const [duration, setDuration] = useState({hours:"", minutes:"", seconds:"" });

const handleCheckDate = (date) => {
  let _valid = true;
  if(date){
    _valid = moment(date, 'hh:mm A').isValid();
  }
  let newFormData = formData;
  newFormData = {...formData,
    [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
     [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
       answer:date.format('hh:mm A'), requiredError:false,  
       validationError:(!_valid),  
       question_type:data.type}}};

 setFormData(newFormData);
};

const handleInputChange = (target,type) => {
  const value = target.value;
  let _valid = true;
  if (type === 'MINUTE') {
      if(Number(value) > 60){
        _valid = false
      } 
  } if (type === 'SECONDS') {
        if(Number(value) > 60){
          _valid = false
        }
  }
  setDuration({...duration, [target.name]:value });

  let durationValue = `${duration.hours !== 0 ? duration.hours : "00"}:${duration.minutes !== 0 ? duration.minutes : "00"}:${duration.seconds !== 0 ? duration.seconds : "00"}`; 

  let newFormData = formData;
  newFormData = {...formData,
    [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
     [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
       answer:durationValue, requiredError:false,  
       validationError:(!_valid),  
       question_type:data.type}}};

  setFormData(newFormData);

}

  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description !== "") && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        {data.options.time_type === "TIME" && <DateTime
          input={true}
          dateFormat={false}
          timeFormat={'hh:mm A'} 
          value={formData[data.form_builder_section_id][data.id]['answer'] !== undefined ? formData[data.form_builder_section_id][data.id]['answer'] : ""}
          onChange={handleCheckDate}
        />}
        {data.options.time_type === 'DURATION' &&
        <div className="ebs-time-form-view">
          <div className="ebs-time-grid d-flex align-items-center ebs-duration-grid">
            <div className="ebs-box">
              <div className="ebs-title">Hrs</div>
              <input minLength="2" maxLength="2" name='hours' onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'HOUR')} type="text" placeholder="00" value={duration.hours} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
            <div className="ebs-title">Min</div>
              <input minLength="2" maxLength="2" name='minutes' onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'MINUTE')} type="text" placeholder="00" value={duration.minutes} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
            <div className="ebs-title">Sec</div>
              <input minLength="2" maxLength="2" name='seconds' onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'SECONDS')} type="text" placeholder="00" value={duration.seconds} />
            </div>
          </div>
        </div>
        }
        
        {formData[data.form_builder_section_id][data.id]['validationError'] === true && <div className='ebs-error-container'> Invalid Date </div>}

        {formData[data.form_builder_section_id][data.id]['requiredError'] === true && <div className='ebs-error-container'>This question is required</div>}
     
      </div>
    </div>
  )
}
export default FormTimebox;