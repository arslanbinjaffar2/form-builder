import React, { Component } from 'react';
import { CreateQuestionContext } from 'app/contexts/CreateQuestionContext';

export default class DateModule extends Component {
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
    const {parent,index} = this.props.data;
    const {active, descVisible, options, required } = this.props.data.data;
    return (
      <div className="ebs-question-grid">
        {active && <div className="ebs-footer-wrapper">
          <div className="ebs-left-area d-flex">
            <span onClick ={(e) => {e.stopPropagation();this.context.cloneQuestion(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
              <i className="material-icons">content_copy</i>
            </span>
            <span onClick ={(e) => {e.stopPropagation();this.context.deleteQuestion(this.props.sectionIndex, this.props.questionIndex, e.target)}}  className="ebs-btn">
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
                <button  onClick={this.handleClick.bind(this)} className="ebs-btn"><span style={{pointerEvents: 'none'}} className="material-icons">more_vert</span></button>
                <div  className="ebs-app-tooltip">
                  <div className="ebs-title-tooltip">Show</div>
                  <div
                  onClick ={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)} 
                  className={`ebs-tooltip-item ${options.description_visible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(e.target, 'RESPONSE' ,`${parent},${index}`)} 
                   className={`ebs-tooltip-item ${options.limit ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Limit to one response per column</div></div>
                  <div
                   onClick ={(e) => this.context.handleGridChoice(e.target, 'SHUFFLE' ,`${parent},${index}`)}
                   className={`ebs-tooltip-item ${options.shuffle ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Shuffle row order</div></div>
                </div>
            </div>
         </div>
        </div>}
      </div>
    )
  }
}
