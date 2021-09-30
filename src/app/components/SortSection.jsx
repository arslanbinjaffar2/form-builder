import React, { Component } from 'react';
import { CreateQuestionContext } from '../contexts/CreateQuestionContext';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  boxShadow: isDragging ? '0 0 5px rgba(0,0,0,0.1)' : ''
});
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default class SortSection extends Component {
  static contextType = CreateQuestionContext;
  state = {
    section: null 
  }
  componentDidMount() {
    const _data = this.context.data;
    const _array = [];

    _data.forEach(element => {
      if (element.type === 'SECTION') {
        _array.push(element);
      }
    });

    this.setState({
      section: _array
    },() => {
      console.log(this.state.section);
    })
  }
  onDragStart(result) {
    document.activeElement.blur();
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.section,
      result.source.index,
      result.destination.index
    );
    this.setState({
      section: items
    })
  }
  render() {
    const { handleSectionSort, handleSectionSortGrid } =  this.context;
    return (
      <div className="ebs-popup-wrapper">
        <div className="ebs-popup-container">
          <div className="ebs-header-popup">
            <h5>Reorder sections</h5>
          </div>
          {this.state.section && 
          <div className="ebs-listing-section">
            
            <DragDropContext onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
              <Droppable droppableId="droppablesection">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.section.map((item,key) =>
                    <Draggable
                    key={key}
                    draggableId={`item-item-${key}`}
                    index={key}>
                       {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            
                          >
                           <div
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                           className="ebs-sortlist">
                            <h4>{item.title}</h4>
                            <p>Section {key+1} of {this.state.section.length}</p>
                           </div>
                          </div>
                        )}
                    </Draggable>
                  )}
                   {provided.placeholder}
                </div>
              )}
              </Droppable>
            </DragDropContext>

          </div>
          }
          <div className="ebs-footer-popup">
            <span onClick={handleSectionSort} className="btn btn-default">Cancel</span>
            <span onClick={() => handleSectionSortGrid(this.state.section)} className="btn btn-default">Save</span>
          </div>
        </div>
      </div>
    )
  }
}
