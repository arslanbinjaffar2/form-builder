import React, { Component } from 'react';
import Select  from "react-select";
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';
import SaveBtn from "@/ui/SaveBtn";

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
  { value: '0', label:  '0'},
  { value: '1', label: `1`}
];
const _dropdown_max = [
  { value: '2', label:  '2'},
  { value: '3', label: `3`},
  { value: '4', label: `4`},
  { value: '5', label: `5`},
  { value: '6', label: `6`},
  { value: '7', label: `7`},
  { value: '8', label: `8`},
  { value: '9', label: `9`},
  { value: '10', label: `10`},
];

export default class LinearScale extends Component {
  static contextType = CreateQuestionContext;
  render() {
    
    const {active, descVisible, options, required, index, id } = this.props.data;
    return (
      <React.Fragment>
      <div className="ebs-linear-scale">
        {active && <div className="ebs-linear-scale-wrapper">
          <div className="row d-flex align-items-center">
            <div style={{maxWidth: 100}} className="col-2">
            <Select
              menuColor='red'
              maxMenuHeight="1"
              menuPlacement="auto"
              isSearchable={false}
              styles={customStyles}
              value={_dropdown_min[_dropdown_min.findIndex(x => x.value === options.min)]} 
              onChange={(e) => this.context.handleLinerChange(this.props.sectionIndex, this.props.questionIndex, e.value, 'LINEAR_MIN' )}
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
            <div style={{maxWidth: 20}} className="col-1 p-0 text-center">to</div>
            <div style={{maxWidth: 100}} className="col-2">
              <Select
                menuColor='red'
                maxMenuHeight="1"
                menuPlacement="auto"
                isSearchable={false}
                styles={customStyles}
                value={_dropdown_max[_dropdown_max.findIndex(x => x.value === options.max)]} 
                onChange={(e) => this.context.handleLinerChange(this.props.sectionIndex, this.props.questionIndex, e.value, 'LINEAR_MAX' )}
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
                options={_dropdown_max} />
            </div>
          </div>
          <div className="ebs-linear-optional">
            <div className="ebs-linear-optional-wrapp d-flex align-items-center">
              <span className={`ebs-counter ${options.min_label !== '' ? 'ebs-active' : ''}`}>{options.min}</span>
              <input
                onChange={(e) => this.context.handleLinerChange(this.props.sectionIndex, this.props.questionIndex, e.target.value, 'MIN_LABEL' )} 
                value={options.min_label} type="text" placeholder="Label (optional)"  />  
            </div>
            <div className="ebs-linear-optional-wrapp d-flex align-items-center">
              <span className={`ebs-counter ${options.max_label !== '' ? 'ebs-active' : ''}`}>{options.max}</span>
              <input
               onChange={(e) => this.context.handleLinerChange(this.props.sectionIndex, this.props.questionIndex, e.target.value, 'MAX_LABEL' )}
               value={options.max_label}
               type="text" placeholder="Label (optional)"  />  
            </div>
          </div>
        </div>}
        {!active && <div className="ebs-linear-view">
            <div className="ebs-linear-view-wrapper d-flex align-items-center text-center">
              <div className="ebs-linear-box d-flex ebs-linear-caption">
                <div className="ebs-label"></div>
                <div className="ebs-value"><div className="ebs-value-inner">{options.min_label}</div></div>
              </div>
               {Array.apply(null,Array((Number(options.max) - (Number(options.min) === 0 ? 0 : 1))+1)).map((e,i) => (
                 <div key={i} className="ebs-linear-box d-flex">
                  <div className="ebs-label">{i + (Number(options.min) === 0 ? 0 : 1)}</div>
                  <div className="ebs-value"><i className="material-icons">radio_button_unchecked</i></div>
                </div>
               ))} 
              <div className="ebs-linear-box d-flex ebs-linear-caption">
                <div className="ebs-label"></div>
                <div className="ebs-value"><div className="ebs-value-inner">{options.max_label}</div></div>
              </div>
            </div>
        </div>}
        </div>
        {active && <div className="ebs-footer-wrapper">
        <div className="ebs-left-area d-flex">
              <SaveBtn
              onClick={() => {
                this.props.data.id !== undefined ?
                this.context.updateQuestion({
                  ...this.props.data,
                  form_builder_form_id: this.props.formId,
                  form_builder_section_id: this.props.sectionId,
                }, this.props.sectionIndex, this.props.questionIndex)
                :
                this.context.addQuestion({
                  ...this.props.data,
                  form_builder_form_id: this.props.formId,
                  form_builder_section_id: this.props.sectionId,
                }, this.props.sectionIndex, this.props.questionIndex);
              }}
            >
              Save Question
            </SaveBtn>
          </div>
          <div className="ebs-left-area d-flex">
            <span onClick ={(e) => {e.stopPropagation();this.context.cloneQuestion({question_id:id}, this.props.sectionIndex, this.props.questionIndex)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation(); id !== undefined ? 
                      this.context.deleteQuestion({question_id:id}, this.props.sectionIndex)
                      : this.context.deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
              <i className="material-icons">delete</i>
            </span>
          </div>
         <div className="ebs-right-area d-flex">
          <div className="ebs-isRequired">
              <label className="ebs-custom-radio d-flex">
                <span className="ebs-title-radio">Required</span>
                <div className="ebs-radio-box">
                  <input type="checkbox" onChange={(e) => this.context.changeQuestionRequiredStatus(this.props.sectionIndex, this.props.questionIndex, e.target.checked)} checked={required} />
                  <div className="ebs-radio-toggle">
                    <div className="ebs-handle"></div>
                  </div>
                </div>
              </label>
            </div>
            <div className="ebs-more-option-panel">
                <button  onClick={(e) => this.context.handleClick(e)} className="ebs-btn tooltip-medium"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                    onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                </div>
            </div>
         </div>
        </div>}
      </React.Fragment>
    )
  }
}
