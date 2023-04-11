import React from 'react';
import { validateShortAnswer } from '../../../helpers/validation';

const FormLinearScale = ({data, formData, setFormData, setValidated}) => {

  const onChange = (evt) => { 
    // console.log(evt);
    let newFormData = formData;
    const valid = evt.currentTarget.value !== "" && data.validation.type !== undefined ? validateShortAnswer(data.validation, evt.currentTarget.value) : true;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer:evt.currentTarget.value, requiredError:false,  
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
        <div className="ebs-linear-view">
            <div className="ebs-linear-view-wrapper d-flex text-center">
              <div className="ebs-linear-box d-flex ebs-linear-caption">
                <div className="ebs-label"></div>
                <div className="ebs-value"><div className="ebs-value-inner">{data.options.min_label}</div></div>
              </div>
                {Array.apply(null,Array((Number(data.options.max) - (Number(data.options.min) === 0 ? 0 : 1))+1)).map((e,i) => (
                  <div key={i} className="ebs-linear-box d-flex">
                  <div className="ebs-label">{i + (Number(data.options.min) === 0 ? 0 : 1)}</div>
                  <div className="ebs-value">
                    <label className="ebs-option ebs-radio">
                      <input name={`item_${data.id}`} defaultValue={data.index} type="radio" value={i} onChange={(e)=>{onChange(e)}} />
                      <i className="material-icons"></i>
                    </label>
                  </div>
                </div>
                ))} 
              <div className="ebs-linear-box d-flex ebs-linear-caption">
                <div className="ebs-label"></div>
                <div className="ebs-value"><div className="ebs-value-inner">{data.options.max_label}</div></div>
              </div>
            </div>
        {formData[data.form_builder_section_id][data.id]['requiredError'] === true && <div className='ebs-error-container'>This question is required</div>}
        </div>
      </div>
    </div>
  )
}
export default FormLinearScale;