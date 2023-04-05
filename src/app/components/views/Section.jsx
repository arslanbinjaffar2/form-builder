import React, {useState, useEffect} from 'react'
import FormMultipleChoice from './FormMultipleChoice';
import FormCheckboxes from './FormCheckboxes';
import FormDropDown from './FormDropDown';
import FormLinearScale from './FormLinearScale';
import FormShortAnswer from './FormShortAnswer';
import FormLongAnswer from './FormLongAnswer';
import FormRadioGrid from './FormRadioGrid';
import FormTickGrid from './FormTickGrid';
import FormTimebox from './FormTimebox';
import FormDatebox from './FormDatebox';
import FormTextBlock from './FormTextBlock';
import { validateShortAnswer } from '../../../helpers/validation';

const Section = ({section, sections, active, setactive, formData, setFormData}) => {
    const [validated, setValidated] = useState(true);
    const [nextSection, setNextSection] = useState(section.next_section);
    const [sectionHistory, setSectionHistory] = useState([]);
    const [stepType, setStepType] = useState("next");
    const [submitForm, setSubmitForm] = useState(false);
    const ValidateSection = async (e, type) => {
        e.preventDefault();
        setStepType(type);
        if(type === 'back'){
             let newSectionHistory = sectionHistory;
             let removehistory = newSectionHistory.pop();
             setactive(removehistory.previous);
         }
       let notValidatedFor = [];
       let formData2 = formData;

            await section.questions.forEach(question => {
                     if(question.required === 1){
                        if(formData2[section.id][question.id].answer === "" || formData2[section.id][question.id].answer.length <= 0 ){
                            formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], requiredError:true}}}
                            notValidatedFor.push(question.id);
                        }
                        
                        if((question.type === "tick_box_grid")){
                            let answerdRows = question.grid_questions.filter((item)=>( formData2[section.id][question.id].answer_id[item.id] !== undefined && formData2[section.id][question.id].answer_id[item.id].length > 0 ? true : false ))
                            if(answerdRows.length !== question.grid_questions.length){
                                formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], requiredError:true}}}
                                notValidatedFor.push(question.id);
                            }
                        }
                        
                        if((question.type === "multiple_choice_grid")){
                            let answerdRows = question.grid_questions.filter((item)=>( formData2[section.id][question.id].answer_id[item.id] !== undefined ? true : false ))
                            if(answerdRows.length !== question.grid_questions.length){
                                formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], requiredError:true}}}
                                notValidatedFor.push(question.id);
                            }
                        }

                        if(question.validation.type !== undefined){
                            if(!validateShortAnswer(question.validation, formData2[section.id][question.id].answer)){
                                formData2 = {...formData2, [question.form_builder_section_id]:{...formData2[section.id], [question.id]: { ...formData2[section.id][question.id], validationError:true}}}
                                setValidated(false);
                                notValidatedFor.push(question.id);
                            }
                        }
                    }
                    if(formData2[section.id][question.id].validationError){
                        setValidated(false);
                        notValidatedFor.push(question.id);
                    }
            });
            setFormData(formData2);
            console.log(notValidatedFor);
            if (notValidatedFor.length <= 0 &&  validated === true){
                if(type === 'next'){
                    setactive(nextSection === "CONTINUE" ? active + 1 : sections.findIndex((sect)=> parseInt(sect.id) === parseInt(nextSection)));
                } 
                if(type === 'submit'){
                   setSubmitForm(true);
                }
            }

      };

    useEffect(() => {
        
        if(stepType === 'back'){
            let newSectionHistory = sectionHistory;
            newSectionHistory.pop();
            setSectionHistory(newSectionHistory)
        }

        if(stepType === 'next'){
            let newSectionHistory = [...sectionHistory, { previous:sectionHistory.length > 0 ? sectionHistory[sectionHistory.length -1].current : 0, current:active}];
            setSectionHistory(newSectionHistory);
        }
     
    }, [active])
    

  return (
    !submitForm ? <React.Fragment>
        {sections && section &&
            <div className="ebs-form-wrapper">
                <div className="ebs-sub-section">
                {section.title && (
                    <div className="ebs-title">{section.title}</div>
                )}
                {section.description && (
                    <div className="ebs-description">{section.description}</div>
                )}
                </div>
            
            {section.questions.map((item, itemIndex) => {

                    if(item.type === "multiple_choice"){
                    return <FormMultipleChoice key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} setNextSection={setNextSection} />
                    }
                    else if(item.type === "checkboxes") {
                    return  <FormCheckboxes key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "drop_down"){
                        
                        return <FormDropDown key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "linear_scale"){
                        return <FormLinearScale key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "short_answer"){
                        return <FormShortAnswer key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "paragraph"){
                        return <FormLongAnswer key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "multiple_choice_grid"){
                        return <FormRadioGrid key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "tick_box_grid"){
                        return <FormTickGrid key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "time"){
                        return <FormTimebox key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "date"){
                        return <FormDatebox key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }
                    else if(item.type === "text_block"){
                        return <FormTextBlock key={itemIndex}  data={item} setFormData={setFormData} formData={formData} setValidated={setValidated} />
                    }else{
                        return null;
                    }

            })}
            
            </div>
        }
        {sections && sections.length === 1 && (
        <div className="ebs-footer-form">
            <button className="btn btn-default btn-submit" onClick={(e) => ValidateSection(e, 'submit')}>Submit</button>
        </div>
        )}
        {sections && sections.length > 1 && active !== sections.length - 1 && (
        <div className="ebs-footer-form">
            {active > 0 && (
            <button
                className="btn btn-default"
                onClick={(e) => ValidateSection(e, 'back')}
            >
                Back
            </button>
            )}
            <button
            className="btn btn-default"
            onClick={(e) => ValidateSection(e, 'next')}
            >
            Next
            </button>
        </div>
        )}
        {sections && sections.length > 1 && active === sections.length - 1 && (
        <div className="ebs-footer-form">
            <button
            className="btn btn-default"
            onClick={(e) => ValidateSection(e, 'back')}
            >
            Back
            </button>
            <button className="btn btn-default btn-submit" onClick={(e) => ValidateSection(e, 'submit')} >Submit</button>
        </div>
        )}
    </React.Fragment> :
        <React.Fragment>
            Form Submitted successfully
        </React.Fragment>

  )
}

export default Section