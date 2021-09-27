import React from 'react';
const FormLinearScale = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title} {data.required && <span className="required">*</span>}
      </div>
      {data.descVisible && data.description && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
      <div className="ebs-linear-view">
          <div className="ebs-linear-view-wrapper d-flex text-center">
            <div className="ebs-linear-box d-flex ebs-linear-caption">
              <div className="ebs-label"></div>
              <div className="ebs-value"><div className="ebs-value-inner">{data.options.minLabel}</div></div>
            </div>
              {Array.apply(null,Array((Number(data.options.max) - (Number(data.options.min) === 0 ? 0 : 1))+1)).map((e,i) => (
                <div key={i} className="ebs-linear-box d-flex">
                <div className="ebs-label">{i + (Number(data.options.min) === 0 ? 0 : 1)}</div>
                <div className="ebs-value">
                  <label className="ebs-option ebs-radio">
                    <input name={`item_${data.index}`} defaultValue={data.index} type="radio" />
                    <i className="material-icons"></i>
                  </label>
                </div>
              </div>
              ))} 
            <div className="ebs-linear-box d-flex ebs-linear-caption">
              <div className="ebs-label"></div>
              <div className="ebs-value"><div className="ebs-value-inner">{data.options.maxLabel}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormLinearScale;