import React, { useState, useContext, useEffect } from "react";
import AppNavbar from "@/AppNavbar";
import Section from "@/const/Section";
import Question from "./questions/Question";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import { FormDataContext } from "app/contexts/FormDataContext";
import Select from "react-select";
import TextSection from "./questions/TextSection";
import SortSection from "./SortSection";

const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderRadius: 0,
    border: 'none',
    padding: 0,
    color: '#444',
    boxShadow: null,
    background: 'transparent'
  }),
  option: (styles) =>( {
    ...styles,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'

  })
};


const PageBreak = ({data, index, onChange, item}) => {
  var newArray = [{ value: 'CONTINUE', label: 'Continue to next section' },
  { value: 'SUBMIT', label: 'Submit form' }];
  data.forEach((element, key) => {
    if(item.id !== element.id){
      const _new = {
        value: element.id,
        label: `Go to Section ${key + 1} (${element.title})`,
      }
      newArray.push(_new)
    }
  });
  return (
    <div className="ebs-page-break-section d-flex align-items-center">
      <div className="ebs-title">After Section "{item.title}"</div>
      <div className="ebs-select">
        <Select
          menuColor='red'
          maxMenuHeight="1"
          menuPlacement="auto"
          isSearchable={false}
          styles={customStyles}
          value={newArray[newArray.findIndex(x => x.value == data[index].next_section)]}
          onChange={(e) => onChange(e.value, index)}
          components={{ IndicatorSeparator: () => null }}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            display: 'none',
            colors: {
              ...theme.colors,
              primary25: '#F4F4F4',
              primary: '#E39840',
            },
          })}
          options={newArray} />
        </div>
    </div>
  )
}


const createForm = (props) => {
	const { data, handleTooltip,sortSection, handleReorder, handleChange, handleChangeSectionSelect, loading, getFormData, cancelAllRequests, updating } = useContext(CreateQuestionContext);
	const { currentForm } = useContext(FormDataContext);
  const [sectionTo, setSectionTo] = useState(null);
  const [sections, setSection] = useState([]);
  useEffect(() => {
    if(data.length <= 0 || data.id !== props.match.params.id){
      getFormData(parseInt(props.match.params.event_id), parseInt(props.match.params.registration_form_id) ,parseInt(props.match.params.id));
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
    }
    return () => {
    }
  }, [data]);
  
  const onDragStart = (result) => {
    // console.log(document.activeElement);
    document.activeElement.blur();
  }
  const onDragEnd = (result) => {
    // dropped outside the list
    console.log(result);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    // console.log(source, 'source');
    // console.log(destination, 'destination');
    handleReorder(source, destination);
  }
  return (
    <React.Fragment>
      <AppNavbar showpanel event_id={props.match.params.event_id} registration_form_id={props.match.params.registration_form_id} />
      
      {loading && data.length <= 0 &&  <div className="ebs-loader-backdrop">
          <div className="ebs-loader-wrapper">
            <div className="ebs-loader"></div>
          </div>
        </div>}
      {sortSection && <SortSection />}
      {!loading && sections.length > 0 &&
      <main className="ebs-main" role="main">
        <div className="container-form">
          <div className="ebs-newform-wrapper">
            <div className="ebs-tooltip-wrapper">
              <ul>
                <li onClick={(e) => handleTooltip("ADD_QUESTION", props.match.params.id)}>
                  <span className="material-icons">add_circle_outline</span>
                </li>
                <li onClick={(e) => handleTooltip("ADD_TITLE_DESCRIPTION", props.match.params.id)}>
                  <span className="material-icons">text_fields</span>
                </li>
                <li onClick={(e) => handleTooltip("ADD_PHOTO", props.match.params.id)}>
                  <span className="material-icons">photo</span>
                </li>
                <li onClick={(e) => handleTooltip("ADD_VIDEO", props.match.params.id)}>
                  <span className="material-icons">slideshow</span>
                </li>
                <li
                  onClick={(e) => handleTooltip("ADD_SECTION", props.match.params.id)}
                >
                  <span className="material-icons">storage</span>
                </li>
              </ul>
            </div>
             {data && data.sections &&
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    {data && data.sections &&
                      data.sections.map((item, k) => (
                        <React.Fragment key={k}>
                         
                            <Section
                              data={sections}
                              onClick={handleChange}
                              index={k}
                              value={item}
                            />
                          <Droppable droppableId={`${k}`} key={`droppable-section-${k}`}>
                            {(provided, snapshot) => (
                              <div 
                              ref={provided.innerRef}    
                              {...provided.droppableProps}
                              >
                                  {item.questions && item.questions.map((question, j)=>{
                                     return (question.type === "multiple_choice" ||
                                        question.type === "checkboxes" ||
                                        question.type === "drop_down" ||
                                        question.type === "short_answer" ||
                                        question.type === "paragraph" ||
                                        question.type === "linear_scale" ||
                                        question.type === "multiple_choice_grid" ||
                                        question.type === "tick_box_grid" ||
                                        question.type === "date" ||
                                        question.type === "time") && (
                                          <Draggable
                                          key={`draggable-question-${question.id ? question.id : question.sort_order}`}
                                          draggableId={`draggable-question-${question.id ? question.id : question.sort_order}`}
                                          index={j}>
                                            {(provided, snapshot) => (
                                              <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              >
                                                <Question
                                                  isDragging={snapshot.isDragging}
                                                  dragHandle={provided.dragHandleProps}
                                                  data={question}
                                                  formId={props.match.params.id}
                                                  sectionId={item.id}
                                                  sectionIndex={k}
                                                  questionIndex={j}
                                                />
                                              </div>
                                            )}
                                          </Draggable>
                                        )}
                                    
                                  )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        {k !== (data.sections.length -1) &&
                          <PageBreak onChange={handleChangeSectionSelect} data={[...data.sections]} index={k} item={item} />
                        }
                        </React.Fragment>
                      ))}
                </DragDropContext>
            }
          </div>
        </div>
      </main>}
      {updating && 
      <div className="ebs-updating-loader-backdrop">
        <div className="ebs-updating-wrapper">
          <div className="ebs-loader"></div>
        </div>
      </div>
      }
    </React.Fragment>
  );
}

export default createForm