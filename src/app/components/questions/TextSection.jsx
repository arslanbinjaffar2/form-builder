import React, { Component } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
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
    const { onClick, value,  index,dragHandle } = this.props;
    return (
      <React.Fragment>
        <div onClick={(e) => { !value.active && onClick(index) }} className={`ebs-section-wrapper  ${value.active ? 'ebs-active-section' : ''}`}>
          <div className="ebs-section-box ebs-text-section">
            <div className="ebs-drag-handle" {...dragHandle}>
              <span className="material-icons">drag_indicator</span>
            </div>
            <div className="row d-flex">
              <div className="col-10">
               <textarea 
                onChange={(e) => this.context.handleTextArea(e.target,'title',index)} 
                placeholder="Untitled form" className="ebs-textarea-alt-title" value={value.title}/>
              </div>
              <div className="col-2 p-0">
              {value.active && <div style={{border: 'none', padding: 0}} className="ebs-footer-wrapper">
                <div className="ebs-left-area d-flex p-0">
                  <span onClick={(e) => { e.stopPropagation(); this.context.handleChangeValueOption(e.target, 'CLONEQUESTION', `${index}`) }} className="ebs-btn">
                    <i className="material-icons">content_copy</i>
                  </span>
                  <span onClick={(e) => { e.stopPropagation(); this.context.handleChangeValueOption(e.target, 'DELETEQUESTION', `${index}`) }} className="ebs-btn">
                    <i className="material-icons">delete</i>
                  </span>
                </div>
                <div className="ebs-right-area d-flex p-0">
                  <div className="ebs-more-option-panel">
                    <button onClick={this.handlebtnClick.bind(this)} className={`ebs-btn ${value.type === 'checkboxes' ? 'tooltip-medium' : ''}`}><span style={{ pointerEvents: 'none' }} className="material-icons">more_vert</span></button>
                    <div className="ebs-app-tooltip">
                      <div className="ebs-title-tooltip">Show</div>
                      <div
                        onClick={(e) => this.context.handleChangeValueOption(e.target, 'DESCRIPTION', `${index}`)}
                        className={`ebs-tooltip-item ${value.descVisible ? 'ebs-active' : ''}`}><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                      
                    </div>
                  </div>
                </div>
              </div>}
              </div>
            </div>
            {value.descVisible && <textarea 
              onChange={(e) => this.context.handleTextArea(e.target,'desc',index)} 
              placeholder="Form Description" className="ebs-textarea-alt-desc" 
              value={value.desc} />}
          </div>
        </div>
      </React.Fragment>
    )
  }
}