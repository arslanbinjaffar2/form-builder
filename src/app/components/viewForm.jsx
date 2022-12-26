import React, { useContext, useState, useEffect } from 'react';
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import AppNavbar from "@/AppNavbar";

import Section from './views/Section';


function viewForm(props) {
  const { data, handleTooltip,sortSection, handleReorder, handleChange, handleChangeSectionSelect, loading, getFormData, cancelAllRequests, updating } = useContext(CreateQuestionContext);
  const [sections, setSection] = useState([]);
  const [active, setactive] = useState(0);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if(data.length <= 0 || data.id !== props.match.params.id){
      getFormData(parseInt(props.match.params.event_id), parseInt(props.match.params.registration_form_id), parseInt(props.match.params.id));
    }
    return () => {
      if(loading){
        cancelAllRequests();
      }
    }
  }, [])
  

  useEffect(() => {
    if(data && data.sections){
      setSection([...data.sections]);
      setFormData(data.sections.reduce((ack, section)=> ( {...ack, [section.id]: section.questions ? section.questions.reduce((ack, question)=> ({...ack, [question.id]: {requiredError:false, validationError:false, question_type:question.type, answer:question.type !== "checkboxes" ? "" : []} }) , {}) : [] } ), {}));
    }
    return () => {
    }
  }, [data]);

  return (
    <React.Fragment>
      <AppNavbar showpanel view event_id={props.match.params.event_id} registration_form_id={props.match.params.registration_form_id} />
        <div className="ebs-form-preview">
          <div className="ebs-form-preview-wrapper">

            {data && (
              <div className="ebs-form-title">
                {data.title && <div className="ebs-title">{data.title}</div>}
                {data.description && (
                  <div className="ebs-description">{data.description}</div>
                )}
              </div>
            )}

              {sections.length > 0 && sections.map((section, index)=>(
                active === index && <Section key={index} section={section} sections={sections} active={active} setactive={setactive} formData={formData} setFormData={setFormData} />
              ))}
            
            
          </div>
        </div>
    </React.Fragment>
  )
}

export default viewForm



// {element.type === "multiple_choice" && (
//   <FormMultipleChoice data={element} />
// )}
// {element.type === "checkboxes" && (
//   <FormCheckboxes data={element} />
// )}
// {element.type === "drop_down" && (
//   <FormDropDown data={element} />
// )}
// {element.type === "linear_scale" && (
//   <FormLinearScale data={element} />
// )}
// {element.type === "short_answer" && (
//   <FormShortAnswer data={element} />
// )}
// {element.type === "paragraph" && (
//   <FormLongAnswer data={element} />
// )}
// {element.type === "multiple_choice_grid" && (
//   <FormRadioGrid data={element} />
// )}
// {element.type === "tick_box_grid" && (
//   <FormTickGrid data={element} />
// )}
// {element.type === "time" && (
//   <FormTimebox data={element} />
// )}
// {element.type === "date" && (
//   <FormDatebox data={element} />
// )}
// {element.type === "TEXT_BLOCK" && (
//   <FormTextBlock data={element} />
// )}