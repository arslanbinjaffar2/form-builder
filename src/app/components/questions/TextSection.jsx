import React, { Component } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import SaveBtn from '@/ui/SaveBtn';
function handleClick() {
  const items = document.querySelectorAll('.ebs-textarea-alt-title');
  const desc = document.querySelectorAll('.ebs-textarea-alt-desc');
  items.forEach(element => {
    element.style.height = '36px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
  desc.forEach(element => {
    element.style.height = '28px';
    let _height = element.scrollHeight;
    element.style.height = _height + 'px';
  });
}
export default class TextSection extends Component {
  static contextType = CreateQuestionContext;
  componentDidMount() {
    window.addEventListener('load',handleClick(),false)
  }
  componentDidUpdate(prevProps, prevState) {
    handleClick()
  }
  componentWillUnmount () {
    window.removeEventListener('load',handleClick(),false)
  }
  handlebtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle('ebs-btn-active');
    const _rect = e.target.getBoundingClientRect();
    const _wHeight = window.innerHeight;
    const _position = _wHeight - (_rect.top + 168);
    if (_position <= 0) {
      e.target.classList.add('ebs-position-top');
    } else {
      e.target.classList.remove('ebs-position-top');
    }
  }
  render() {
    const {  data,  index, dragHandle } = this.props;
    return (
      <React.Fragment>
        <div onClick={(e) => { !data.active && this.context.handleQuestionChange(this.props.sectionIndex, this.props.questionIndex); }} className={`ebs-section-wrapper  ${data.active ? 'ebs-active-section' : ''}`}>
          <div className="ebs-section-box ebs-text-section">
            <div className="ebs-drag-handle" {...dragHandle}>
              <span className="material-icons">drag_indicator</span>
            </div>
            <div className="row d-flex">
              <div className="col-10">
               <textarea 
                 onChange={(e) =>
                  this.context.handleChangeValue(
                    this.props.sectionIndex,
                    this.props.questionIndex,
                    e.target,
                    "title"
                  )
                }
                value={data.description} 
                placeholder="Untitled form" className="ebs-textarea-alt-title" value={data.title}/>
              </div>
              <div className="col-2 p-0">
              {data.active && <div style={{border: 'none', padding: 0}} className="ebs-footer-wrapper">
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
                <div className="ebs-left-area d-flex p-0">
                  <span onClick={(e) => { e.stopPropagation(); this.context.handleChangeValueOption(e.target, 'CLONEQUESTION', `${index}`) }} className="ebs-btn">
                    <i className="material-icons">content_copy</i>
                  </span>
                  <span onClick={(e) => { e.stopPropagation(); data.id !== undefined ? 
                      this.context.deleteQuestion({question_id: data.id}, this.props.sectionIndex)
                      : this.context.deleteQuestionFront(this.props.sectionIndex, this.props.questionIndex, e.target) }} className="ebs-btn">
                    <i className="material-icons">delete</i>
                  </span>
                </div>
                {/* <div className="ebs-right-area d-flex p-0">
                  <div className="ebs-more-option-panel">
                    <button onClick={this.handlebtnClick.bind(this)} className={`ebs-btn ${data.type === 'checkboxes' ? 'tooltip-medium' : ''}`}><span style={{ pointerEvents: 'none' }} className="material-icons">more_vert</span></button>
                    <div className="ebs-app-tooltip">
                      <div className="ebs-title-tooltip">Show</div>
                      <div
                        onClick={(e) => this.context.setDescription(this.props.sectionIndex, this.props.questionIndex, e.target)}
                        className={'ebs-tooltip-item  ebs-active' }><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                      
                    </div>
                  </div>
                </div> */}
              </div>}
              </div>
            </div>
             <textarea 
               onChange={(e) =>
                this.context.handleChangeValue(
                  this.props.sectionIndex,
                  this.props.questionIndex,
                  e.target,
                  "description"
                )
              }
              value={data.description}
              placeholder="Form Description" className="ebs-textarea-alt-desc" 
              />
          </div>
        </div>
      </React.Fragment>
    )
  }
}