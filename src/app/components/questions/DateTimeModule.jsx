import React, { Component } from 'react';
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';
import SaveBtn from "@/ui/SaveBtn";

export default class DateTimeModule extends Component {
  static contextType = CreateQuestionContext;
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle('ebs-btn-active');
    const _rect = e.target.getBoundingClientRect();
    const _wHeight = window.innerHeight;
    const _position = _wHeight - (_rect.top + 168);
    if (_position <= 0 ) {
      e.target.classList.add('ebs-position-top');
    } else {
      e.target.classList.remove('ebs-position-top'); 
    }
  }
  componentDidMount() {
    window.addEventListener('click',this.onBodyClick.bind(this), false)
  }

  onBodyClick = (e) => {
    var _tooltip = document.querySelector('.ebs-more-option-panel .ebs-btn');
    if (_tooltip) {
      _tooltip.classList.remove('ebs-btn-active');
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click',this.onBodyClick.bind(this), false)
  }
  render() {
    const {active, descVisible, options, required, type, index, id } = this.props.data;
    return (
      <React.Fragment>
      <div className="ebs-datetime-grid">
        <div className="ebs-datetime-grid-wrapper">
          {type === 'date' && <div className="ebs-datetime-content">
            <div className={`ebs-datetime-list ${active ? 'ebs-type-active' : ''}`}>
              <div className="ebs-title">Month, Day {options.year && ', Year'}</div>
              <div className="ebs-icon"><i className="material-icons">date_range</i></div>
            </div>
            {options.time && <div className={`ebs-datetime-list ${active ? 'ebs-type-active' : ''}`}>
              <div className="ebs-title">Time</div>
              <div className="ebs-icon"><i className="material-icons">schedule</i></div>
            </div>}
          </div>}
          {type === 'time' && <div className="ebs-datetime-content">
            <div className={`ebs-datetime-list ${active ? 'ebs-type-active' : ''}`}>
              <div className="ebs-title">{options.time_type === 'TIME' ? 'Time' : 'Duration'}</div>
              <div className="ebs-icon"><i className="material-icons">schedule</i></div>
            </div>
          </div>}
        </div>
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
            <span onClick ={(e) => {e.stopPropagation();this.context.cloneQuestion(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation(); id !== undefined ? 
                      this.context.deleteQuestion({question_id:id}, this.props.sectionIndex)
                      : this.context.deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target) }}  className="ebs-btn">
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
                <button  onClick={this.handleClick.bind(this)} className="ebs-btn tooltip-medium"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                  onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  {type === 'date' && <React.Fragment> <div
                   onClick ={(e) => this.context.handleChangeDateTime(this.props.sectionIndex, this.props.questionIndex, 'INCLUDE_TIME')} 
                   className={`ebs-tooltip-item ${options.time ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Include time</div></div>
                  <div
                   onClick ={(e) => this.context.handleChangeDateTime(this.props.sectionIndex, this.props.questionIndex, 'INCLUDE_YEAR')}
                   className={`ebs-tooltip-item ${options.year ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Include year</div></div></React.Fragment>}
                   {type === 'time' && <React.Fragment>
                   <div className="ebs-title-tooltip">Answer Type</div>
                   <div
                      onClick ={(e) => this.context.handleChangeDateTime(this.props.sectionIndex, this.props.questionIndex, 'TIME_DURATION')} 
                      className={`ebs-tooltip-item ${options.time_type === 'TIME' ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title"> Time</div>
                    </div>
                   <div
                      onClick ={(e) => this.context.handleChangeDateTime(this.props.sectionIndex, this.props.questionIndex, 'TIME_DURATION')} 
                      className={`ebs-tooltip-item ${options.time_type === 'DURATION' ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title"> Duration</div>
                    </div>
                    </React.Fragment>}
                </div>
            </div>
         </div>
        </div>}
      </React.Fragment>
    )
  }
}
