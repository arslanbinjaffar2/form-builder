import React, { Component } from 'react';
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';
import SaveBtn from "@/ui/SaveBtn";

export default class DateModule extends Component {
  static contextType = CreateQuestionContext;
  render() {
    const {parent,index} = this.props.data;
    const {active, descVisible, options, required, id } = this.props.data;
    return (
      <div className="ebs-question-grid">
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
                <button  onClick={(e) => this.context.handleClick(e)} className="ebs-btn"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                  onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'RESPONSE' ,`${parent},${index}`)} 
                   className={`ebs-tooltip-item ${options.limit ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Limit to one response per column</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(this.props.sectionIndex, this.props.questionIndex, e.target, 'SHUFFLE' ,`${parent},${index}`)}
                   className={`ebs-tooltip-item ${options.shuffle ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Shuffle row order</div></div>
                </div>
            </div>
         </div>
        </div>}
      </div>
    )
  }
}
