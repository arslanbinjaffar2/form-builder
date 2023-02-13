import React, { useState, useEffect } from 'react';
import Select  from "react-select";
import moment from 'moment';


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

const FormDatebox = ({data, setFormData, formData, setValidated}) => {

  const [state, setState] = useState(0);
  const [hour, setHour] = useState(''); 
  const [minutes, setMinutes] = useState('');
  const [days, setDays] = useState('');
  const [months, setMonths] = useState('');
  const [years, setYears] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
  // if(){
    handleCheckDate();
  // }
}, [state, hour, minutes, days, months, years, error])



 const handleCheckDate = () => {
    setError('');
    let _valid = true;
   if(data.options.years && years === ''){
     _valid = false;
     setError("Year is required..")
   }
   else if(data.options.time && (minutes === '' || hour === '')){
     _valid = false;
     setError("Time is required..")
   }
    let date = `${months}-${days}`;
    date = data.options.year ? `${years}-${date}` : date;  
    date = data.options.time ? `${date} ${hour}:${minutes}` : date;  
    console.log(new Date(date));
     _valid = moment(new Date(date)).isValid();
     console.log(date)
   if(!_valid){
      setError("Invalid Date");
   }

    // console.log(_valid);
    setError(!_valid);
    let newFormData = formData;

    newFormData = {...formData,
      [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
       [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
         answer:date, requiredError:false,  
         validationError:!_valid,  
         question_type:data.type}}};

   console.log(newFormData);
   setFormData(newFormData);

  };
const  handleInputChange = (e, type) => {
    e.preventDefault();
    const value = e.target.value;
    if (type === "HOUR") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        
        setHour(value)
      }
    }
    if (type === "MINUTE") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
       
        setMinutes(value)
      }
    }
    if (type === "DAYS") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        setDays(value)
      }
    }
    if (type === "MONTHS") {
      if (Number(value) || value === "" || value === "0" || value === "00") {
        setMonths(value)
      }
    }
    if (type === "YEARS") {
      if (Number(value) || value === "" || value === "0" || value === "00" || value === "000" || value === "0000") {
        setYears(value)
      }
    }
  }
const  handleSelect = (e) => 
{
    setState(_dropdown_min.findIndex(x => x.label === e.value));
  }
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-time-form-view">
          <div className="ebs-time-grid d-flex align-items-center ebs-duration-grid">
            <div className="ebs-box">
              <div className="ebs-title">DD</div>
              <input 
                 maxLength="2" 
                 onFocus={(e) => e.target.select()} 
                 onChange={(e) => handleInputChange(e, 'DAYS')} 
                 type="text" placeholder="00" 
                 value={days}
              />
            </div>
            <div className="ebs-box-sep">/</div>
            <div className="ebs-box">
              <div className="ebs-title">MM</div>
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e, 'MONTHS')} type="text" placeholder="00" value={months} />
            </div>
            {data.options.year === 1 && 
            <React.Fragment>
              <div className="ebs-box-sep">/</div>
              <div style={{width: 50,textAlign: 'center'}} className="ebs-box">
                <div className="ebs-title">YYYYY</div>
                <input minLength="2" maxLength="4" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e, 'YEARS')} type="text" placeholder="0000" value={years} />
              </div>
            </React.Fragment>
            }
          </div>
        </div>
      {data.options.time === 1 &&
        <div className="ebs-time-form-view">
          <h4>Time</h4>
          <div className="ebs-time-grid d-flex align-items-center">
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e,'HOUR')} type="text" placeholder="00" value={hour} />
            </div>
            <div className="ebs-box-sep">:</div>
            <div className="ebs-box">
              <input minLength="2" maxLength="2" onFocus={(e) => e.target.select()} onChange={(e) => handleInputChange(e,'MINUTE')} type="text" placeholder="00" value={minutes} />
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
        {error && 
        <div className="error">{error}</div>
        }
    </div>
    </div>
  )
}

export default FormDatebox