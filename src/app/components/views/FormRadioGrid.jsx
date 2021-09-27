import React from 'react';
const FormRadioGrid = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title} {data.required && <span className="required">*</span>}
      </div>
      {data.descVisible && data.description && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-question-grid-view">
          <div className="ebs-question-grid-wrapp">
            <div className="ebs-question-grid-header">
              <div className="ebs-question-grid-th ebs-grid-title"></div>
              {data.options.columns && data.options.columns.map((list,k) => 
                <div key={k} className="ebs-question-grid-th">{list}</div>
              )}
            </div>
            {data.options.rows && data.options.rows.map((items,key) => 
              <div key={key} className="ebs-question-grid-header">
                <div className="ebs-question-grid-th ebs-grid-title">{items}</div>
                {data.options.columns && data.options.columns.map((list,k) => 
                  <div key={k} className="ebs-question-grid-th ebs-grid-checkbox">
                      <label className="ebs-option ebs-radio">
                        <input name={`item_${key}`} defaultValue={data.index} type="radio" />
                        <i className="material-icons"></i>
                      </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormRadioGrid;