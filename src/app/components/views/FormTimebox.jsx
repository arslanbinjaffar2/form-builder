import React, { useState, useEffect } from 'react';
import Select  from "react-select";
import moment from 'moment/moment';

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

const _dropdown_min = [
  { value: 'AM', label:  'AM'},
  { value: 'PM', label: `PM`}
];

const FormTimebox = ({data,  setFormData, formData}) => {
const [state, setstate] = useState(0)
const [hour, sethour] = useState('');
const [minutes, setminutes] = useState('');
const [seconds, setseconds] = useState('');

const [error, setError] = useState('');

useEffect(() => {
  // if(){
    handleCheckDate();
  // }
}, [state, hour, minutes, seconds,  error])

const handleCheckDate = () => {
  setError('');
  let _valid = true;
 if(data.options.time_type == "DURATION" && seconds == ''){
   _valid = false;
   setError("Seconds is required..")
 }
 else if((minutes === '' || hours === '')){
   _valid = false;
   setError("Hour and minutes are required..")
 }
  let hours = data.options.time_type == "DURATION" ? `${hour}:${minutes}:${seconds}`: `${hour}:${minutes}`;
    
  console.log(new Date(hours));
   _valid = moment(new Date(hours), 'h:mm').isValid();
   
   if(!_valid){
     setError("Invalid Date");
    }
    
  hours = `${hours} ${state == 0 ? "AM" : "PM"}`;
    
  // console.log(_valid);
  setError(!_valid);
  let newFormData = formData;

  newFormData = {...formData,
    [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
     [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
       answer:hours, requiredError:false,  
       validationError:!_valid,  
       question_type:data.type}}};

 setFormData(newFormData);

};

const handleSelect = (e) => {
  setstate(_dropdown_min.findIndex(x => x.label === e.value))
}
const handleInputChange = (target,type) => {
  const value = target.value;
  if (type === 'HOUR') {
    if (Number(value) || value === '' || value === '0' || value === '00') {
      sethour(value)
    }
  } if (type === 'MINUTE') {
    if (Number(value) || value === '' || value === '0' || value === '00') {
      setminutes(value)
    }
  } if (type === 'SECONDS') {
      if (Number(value) || value === '' || value === '0' || value === '00') {
        setseconds(value)
      }
  }
}
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        {data.options.time_type === 'TIME' &&
        <div className="ebs-time-form-view">
          <h4>Time</h4>
          <div className="ebs-time-grid d-flex">
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'HOUR')} type="text" placeholder="00" value={hour} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'MINUTE')} type="text" placeholder="00" value={minutes} />
            </div>
            <div className="ebs-select">
              <Select
                menuColor='red'
                maxMenuHeight="1"
                menuPlacement="auto"
                isSearchable={false}
                styles={customStyles}
                value={_dropdown_min[state]}
                onChange={handleSelect} 
                components={{IndicatorSeparator: () => null }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#F4F4F4',
                    primary: '#E39840',
                  },
                })}
                options={_dropdown_min} />
            </div>
          </div>
        </div>}
        {data.options.time_type === 'DURATION' &&
        <div className="ebs-time-form-view">
          <div className="ebs-time-grid d-flex align-items-center ebs-duration-grid">
            <div className="ebs-box">
              <div className="ebs-title">Hrs</div>
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'HOUR')} type="text" placeholder="00" value={hour} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
            <div className="ebs-title">Min</div>
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'MINUTE')} type="text" placeholder="00" value={minutes} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
            <div className="ebs-title">Sec</div>
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e.target,'SECONDS')} type="text" placeholder="00" value={seconds} />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
export default FormTimebox;