import React, { Component } from "react";
import AppNavbar from "@/AppNavbar";
import Section from "@/const/Section";
import Question from "./questions/Question";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import Select from "react-select";

const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderRadius: 0,
    border: 'none',
    padding: 0,
    color: '#444',
    boxShadow: null
  }),
  option: (styles) =>( {
    ...styles,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'

  })
};


const PageBreak = ({data, index, onChange}) => {
  const item =  data.findIndex(x => x.index === index) - 1;
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
    <React.Fragment>
      <div>After Section {item+1}</div>
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
    </React.Fragment>
  )
}

export default class createForm extends Component {
  static contextType = CreateQuestionContext;
  state = {
    sectionTo: null,
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.context.handleReorder(result.source.index, result.destination.index);
  }
  render() {
    var _newArray = [];
    this.context.data.forEach((element) => {
      if (element.type === "SECTION") {
        _newArray.push(element);
      }
    });
    return (
      <React.Fragment>
        <AppNavbar showpanel />
        <main className="ebs-main" role="main">
          <div className="container-form">
            <div className="ebs-newform-wrapper">
              <div className="ebs-tooltip-wrapper">
                <ul>
                  <li onClick={(e) => this.context.handleTooltip("ADD_QUESTION")}>
                    <span className="material-icons">add_circle_outline</span>
                  </li>
                  <li onClick={(e) => this.context.handleTooltip("ADD_TITLE_DESCRIPTION")}>
                    <span className="material-icons">text_fields</span>
                  </li>
                  <li onClick={(e) => this.context.handleTooltip("ADD_PHOTO")}>
                    <span className="material-icons">photo</span>
                  </li>
                  <li onClick={(e) => this.context.handleTooltip("ADD_VIDEO")}>
                    <span className="material-icons">slideshow</span>
                  </li>
                  <li
                    onClick={(e) => this.context.handleTooltip("ADD_SECTION")}
                  >
                    <span className="material-icons">storage</span>
                  </li>
                </ul>
              </div>
              <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {this.context.data &&
                        this.context.data.map((item, k) => (
                          <React.Fragment key={k}>
                            {item.type === "SECTION" && item.index === 0 && (
                              <Section
                                data={_newArray}
                                onClick={this.context.handleChange}
                                index={item.index}
                                value={item}
                              />
                            )}
                            {item.type === "SECTION" && item.index > 0 && (
                              <React.Fragment key={item.index}>
                                <Draggable
                                  isDragDisabled={true}
                                  draggableId={`item-${item.index}`}
                                  index={k}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                     <PageBreak onChange={this.context.handleChangeSectionSelect} data={_newArray} index={item.index} />
                                    </div>
                                  )}
                                </Draggable>
                                <Draggable
                                  isDragDisabled={true}
                                  key={item.index}
                                  draggableId={`item-${item.index}`}
                                  index={k}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Section
                                        data={_newArray}
                                        onClick={this.context.handleChange}
                                        index={item.index}
                                        value={item}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              </React.Fragment>
                            )}

                            {(item.type === "multiple_choice" ||
                              item.type === "checkboxes" ||
                              item.type === "drop_down" ||
                              item.type === "short_answer" ||
                              item.type === "paragraph" ||
                              item.type === "linear_scale" ||
                              item.type === "multiple_choice_grid" ||
                              item.type === "tick_box_grid" ||
                              item.type === "date" ||
                              item.type === "time") && (
                                <Draggable
                                  key={item.index}
                                  isDragDisabled={this.context.data.length > 2 ? false : true}
                                  draggableId={`item-${item.index}`}
                                  index={k}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}>
                                      <Question
                                        isDragging={snapshot.isDragging}
                                        dragHandle={provided.dragHandleProps}
                                        data={item}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              )}
                          </React.Fragment>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
