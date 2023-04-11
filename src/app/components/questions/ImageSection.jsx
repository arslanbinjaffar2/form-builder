import React, { useContext, useState, useEffect } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import SaveBtn from '@/ui/SaveBtn';
import {useDropzone} from 'react-dropzone';
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
const ImageSection = (props) => {
  const [files, setFiles] = useState([]);
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles:1,
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div  key={file.name}>
      <div>
        <img  src={file.preview} onLoad={() => { URL.revokeObjectURL(file.preview) }} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  //  contextType = CreateQuestionContext;
   const context = useContext(CreateQuestionContext);
  // componentDidMount() {
  //   window.addEventListener('load',handleClick(),false)
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   handleClick()
  // }
  // componentWillUnmount () {
  //   window.removeEventListener('load',handleClick(),false)
  // }

    const {  data,  index, dragHandle } = props;
    return (
      <React.Fragment>
        <div onClick={(e) => { !data.active && context.handleQuestionChange(props.sectionIndex, props.questionIndex); }} className={`ebs-section-wrapper  ${data.active ? 'ebs-active-section' : ''}`}>
          <div className="ebs-section-box ebs-text-section">
            <div className="ebs-drag-handle" {...dragHandle}>
              <span className="material-icons">drag_indicator</span>
            </div>
            <div className="row d-flex">
              <div className="col-10">
               <textarea 
                 onChange={(e) =>
                  context.handleChangeValue(
                    props.sectionIndex,
                    props.questionIndex,
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
                      props.data.id !== undefined ?
                      context.updateQuestion({
                        ...props.data,
                        form_builder_form_id: props.formId,
                        form_builder_section_id: props.sectionId,
                      }, props.sectionIndex, props.questionIndex)
                      :
                      context.addQuestion({
                        ...props.data,
                        form_builder_form_id: props.formId,
                        form_builder_section_id: props.sectionId,
                      }, props.sectionIndex, props.questionIndex);
                    }}
                  >
                    Save Question
                  </SaveBtn>
                </div>
                <div className="ebs-left-area d-flex p-0">
                  <span onClick={(e) => { e.stopPropagation(); context.cloneQuestion({question_id:data.id}, props.sectionIndex, props.questionIndex) }} className="ebs-btn">
                    <i className="material-icons">content_copy</i>
                  </span>
                  <span onClick={(e) => { e.stopPropagation(); data.id !== undefined ? 
                      context.deleteQuestion({question_id: data.id}, props.sectionIndex)
                      : context.deleteQuestionFront(props.sectionIndex, props.questionIndex, e.target) }} className="ebs-btn">
                    <i className="material-icons">delete</i>
                  </span>
                </div>
                {/* <div className="ebs-right-area d-flex p-0">
                  <div className="ebs-more-option-panel">
                    <button onClick={handlebtnClick.bind(this)} className={`ebs-btn ${data.type === 'checkboxes' ? 'tooltip-medium' : ''}`}><span style={{ pointerEvents: 'none' }} className="material-icons">more_vert</span></button>
                    <div className="ebs-app-tooltip">
                      <div className="ebs-title-tooltip">Show</div>
                      <div
                        onClick={(e) => context.setDescription(props.sectionIndex, props.questionIndex, e.target)}
                        className={'ebs-tooltip-item  ebs-active' }><span className="material-icons ebs-icon">check</span><div className="ebs-title">Description</div></div>
                      
                    </div>
                  </div>
                </div> */}
              </div>}
              </div>
            </div>
            
            {thumbs}
     
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  export default ImageSection;
