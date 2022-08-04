import React, { Component, useState, useContext, useEffect } from "react";
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


const PageBreak = ({data, index, onChange}) => {
  console.log(data);
  const item =  index;
  var newArray = [{ value: 'CONTINUE', label: 'Continue to next section' },
  { value: 'SUBMIT', label: 'Submit form' }];
  data.forEach((element, key) => {
    const _new = {
      value: `SECTION_${key}`,
      label: `Go to Section ${key + 1} (${element.title})`,
    }
    newArray.push(_new)
  });
  return (
    <div className="ebs-page-break-section d-flex align-items-center">
      <div className="ebs-title">After Section {item}</div>
      <div className="ebs-select">
        <Select
          menuColor='red'
          maxMenuHeight="1"
          menuPlacement="auto"
          isSearchable={false}
          styles={customStyles}
          value={newArray[newArray.findIndex(x => x.value === data[item].nextSection)]}
          onChange={(e) => onChange(e.value, data[item].index)}
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
    getFormData(parseInt(props.match.params.id));
    return () => {
      cancelAllRequests();
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
    document.activeElement.blur();
  }
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    handleReorder(result.source.index, result.destination.index);
  }
  return (
    <React.Fragment>
      <AppNavbar showpanel />
      {loading && data.length <= 0 && <span>loading...</span>}
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
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {data && data.sections &&
                          data.sections.map((item, k) => (
                            <React.Fragment key={k}>
                              {k === 0 && (
                                <Section
                                  data={sections}
                                  onClick={handleChange}
                                  index={k}
                                  value={item}
                                />
                              )}
                              {k > 0 && (
                                <React.Fragment key={k}>
                                  <Draggable
                                    isDragDisabled={true}
                                    draggableId={`item-${k}`}
                                    index={k}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                      <PageBreak onChange={handleChangeSectionSelect} data={sections} index={k} />
                                      </div>
                                    )}
                                  </Draggable>
                                  <Draggable
                                    isDragDisabled={true}
                                    key={k}
                                    draggableId={`item-${k}`}
                                    index={k}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Section
                                          data={sections}
                                          onClick={handleChange}
                                          index={k}
                                          value={item}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                </React.Fragment>
                              )}
                              {item.type === 'TEXT_BLOCK' && 
                              <Draggable
                                key={item.sort_order}
                                isDragDisabled={data.length > 2 ? false : true}
                                draggableId={`item-${item.sort_order}`}
                                index={k}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <TextSection
                                      data={sections}
                                      onClick={handleChange}
                                      index={item.id}
                                      value={item}
                                      dragHandle={provided.dragHandleProps}
                                    />
                                  </div>
                                )}
                              </Draggable>}
                              {item.questions && item.questions.map((question)=>(
                                <React.Fragment>
                                  {(question.type === "multiple_choice" ||
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
                                        key={k}
                                        isDragDisabled={item.questions.length > 2 ? false : true}
                                        draggableId={`item-${k}`}
                                        index={k}>
                                        {(provided, snapshot) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>
                                            <Question
                                              isDragging={snapshot.isDragging}
                                              dragHandle={provided.dragHandleProps}
                                              data={question}
                                            />
                                          </div>
                                        )}
                                      </Draggable>
                                    )}
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
            }
          </div>
        </div>
      </main>}
      {updating && <div className="ebs-loader-wrapper">
        <div className="ebs-loader"></div>
      </div>}
    </React.Fragment>
  );
}

export default createForm