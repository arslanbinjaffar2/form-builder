import React from 'react';
const FormRadioGrid = ({data}) => {
  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-question-grid-view">
          <div className="ebs-question-grid-wrapp">
            <div className="ebs-question-grid-header">
              <div className="ebs-question-grid-th ebs-grid-title"></div>
              {data.answers && data.answers.map((list,k) => 
                <div key={k} className="ebs-question-grid-th">{list.label}</div>
              )}
            </div>
            {data.grid_questions && data.grid_questions.map((items,key) => 
              <div key={key} className="ebs-question-grid-header">
                <div className="ebs-question-grid-th ebs-grid-title">{items.label}</div>
                {data.answers && data.answers.map((list,k) => 
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