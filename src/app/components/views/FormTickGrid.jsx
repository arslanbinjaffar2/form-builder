import React, {useState, useEffect, useRef} from 'react';
import {shuffleArray} from '../../../helpers/validation';
const FormTickGrid = ({data, formData, setFormData, setValidated}) => {
  const [answeredColumn, setAnsweredColumn] = useState([]);
  const [gridQuestions, setQridQuestions] = useState([]);
  const mountRef = useRef(null);
  useEffect(() => {
    if(mountRef.current === null){
      setQridQuestions(data.options.shuffle === 1 && data.grid_questions.length > 0 ? shuffleArray(data.grid_questions) : data.grid_questions);
      mountRef.current = 1;
    }

  }, [])


  const onChange = (evt, anwser_id, question_id) => { 
    let answers2 = formData[data.form_builder_section_id][data.id]['answer_id'];
    let newAnswer = answers2[question_id] === undefined ? [] : answers2[question_id];
    let valid = true;
    
    if(data.options.limit !== undefined && data.options.limit === 1){
        if(answeredColumn.findIndex((item:any)=>(item === anwser_id)) > -1 && newAnswer.findIndex((item:any)=>(item === anwser_id)) < 0){
            return;
        }
    }

    if(newAnswer.findIndex((item:any)=>(item === anwser_id)) > -1){
        newAnswer = newAnswer.filter((item:any)=>(item !== anwser_id))
        setAnsweredColumn(answeredColumn.filter((item:any)=>(item !== anwser_id)));
    }else{
        newAnswer =[...newAnswer, anwser_id]; 
        setAnsweredColumn([...answeredColumn, anwser_id]);
    }

    console.log(newAnswer);
    answers2[question_id] = newAnswer;

    let newFormData = formData;
    newFormData = {...formData,
       [data.form_builder_section_id]:{...formData[data.form_builder_section_id], 
        [data.id]:{ ...formData[data.form_builder_section_id][data.id], 
          answer_id:answers2, requiredError:false,  
          validationError:!valid,
          was_answered:true,
          question_type:data.type}}};

    console.log(newFormData);
    setFormData(newFormData);
    setValidated(valid);
  }

  return (
    <div className="ebs-formview-mulitple">
      <div className="form-view-title">
        {data.title && data.title} {data.required === 1 && <span className="required">*</span>}
      </div>
      {(data.options.description_visible === 1 && data.description) && <div className="form-view-description">{data.description}</div>}
      <div className="ebs-options-view">
        <div className="ebs-question-grid-view">
          <div className="ebs-question-grid-wrapp">
            <div className="ebs-question-grid-header">
              <div className="ebs-question-grid-th ebs-grid-title"></div>
              {data.answers && data.answers.map((list,k) => 
                <div key={k} className="ebs-question-grid-th">{list.label}</div>
              )}
            </div>
            {data.grid_questions && gridQuestions.map((items,key) => 
              <div key={key} className="ebs-question-grid-header">
                <div className="ebs-question-grid-th ebs-grid-title">{items.label}</div>
                {data.answers && data.answers.map((element,k) => 
                  <div key={k} className="ebs-question-grid-th ebs-grid-checkbox">
                      <label className="ebs-option ebs-radio">
                        <input name={`item_${key}`} defaultValue={data.index} type="checkbox" checked={(formData[data.form_builder_section_id][data.id].answer_id !== undefined && 
                          formData[data.form_builder_section_id][data.id].answer_id[items.id] !== undefined && formData[data.form_builder_section_id][data.id].answer_id[items.id].findIndex((item:any)=>(item === element.id)) > -1) ? true : false} value={element.id} onChange={(e)=>{onChange(e, element.id, items.id)}} />
                        <i className="material-icons"></i>
                      </label>
                  </div>
                )}
              </div>
            )}
            {formData[data.form_builder_section_id][data.id]['requiredError'] === true && "This question is required"}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormTickGrid;