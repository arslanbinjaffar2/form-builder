import React, { createContext, Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const _answerboxshortOption = {
  response_validation: 0,
};
const _answerboxshortValidation = {
  customError: '',
  type: 'NUMBER',
  rule: 'GREATER_THAN',
  value: '',
  value_2: '',
};
const _answerboxparaOption = {
  response_validation: 0,
};
const _answerboxparaValidation = {
  custom_error: '',
  type: 'LENGTH',
  rule: 'MAX_CHAR_COUNT',
  value: '',
  value_2: '',
};

// const _checkboxOption = {
//   response_validation: 0,
// };

const _checkboxvalidation = {
  custom_error: '',
  type: 'checkboxes',
  rule: 'AT_LEAST',
  value: '',
  value_2: '',
};

const _linearscaleOption = {
  min: '1',
  max: '5',
  min_label: '',
  max_label: '',
}

const _mulitplechoiceOptions = {
  add_other: 0,
  section_based: 0,
  
};
const _mulitplechoiceAnswers = [
    {
      label: 'Option 1',
      next_section: 'CONTINUE'
    }
  ];
const _mulitplechoicegridOptions = {
  limit: 0,
  shuffle: 0,
};

const _mulitplechoicegridRows= [
  {
    label: 'Row 1',
  },
  {
    label: 'Row 2',
  },
  ];
const _mulitplechoicegridColumns=[
  {
    label: 'Column 1',
  },
  {
    label: 'Column 2',
  },
];



const _datemoduleOptions = {
  date: 1,
  year: 0,
  time: 0,
};
const _timemoduleOptions = {
  time_type: 'TIME'
};
const _newquestion = {
  title: '',
  type: 'multiple_choice',
  required: 0,
  description: '',
  active: 0,
  sort_order:0,
  form_builder_form_id:0,
  form_builder_section_id:0,
  options: {
    description_visible: 1,
    add_other: 0,
    section_based: 0,
  },
  answers: [
    {
      label: 'Option 1',
      next_section: 'CONTINUE'
    }
  ]
};
const _newsection = {
  title: 'Untitled Section',
  description: '',
  next_section: 'CONTINUE',
  form_builder_form_id:0,
  active: 0,
  sort_order: 0,
};
const _newtextarea = {
  type: 'text_block',
  title: 'Text section',
  description: '',
  required: 0,
  active: 0,
  sort_order:0,
  form_builder_form_id:0,
  form_builder_section_id:0,
};
const _newVideoBlock = {
  type: 'video_block',
  title: 'Upload video',
  description: '',
  required: 0,
  active: 0,
  sort_order:0,
  form_builder_form_id:0,
  form_builder_section_id:0,
};
const _newImageBlock = {
  type: 'image_block',
  title: 'Upload Image',
  description: '',
  required: 0,
  active: 0,
  sort_order:0,
  form_builder_form_id:0,
  form_builder_section_id:0,
};

// const _data = [
//   {
//     index: 0,
//     type: 'SECTION',
//     title: 'Form Title',
//     desc: 'Form Description',
//     next_section: 'CONTINUE',
//     active: true,

//   }, {
//     index: 1,
//     title: 'Question',
//     type: 'multiple_choice',
//     required: false,
//     description: '',
//     descVisible: true,
//     active: false,
//     options: {
//       addOther: false,
//       section_based: false,
//       response: null,
//       answers: [
//         {
//           label: 'Option 1',
//           next_section: 'CONTINUE'
//         }
//       ]
//     }
//   }
// ]

export const CreateQuestionContext = createContext();
class CreateQuestionContextProvider extends Component {
  state = {
    data: [],
    loading:false,
    loadingError:null,
    updating:false,
    updatingError:null,
    sortSection: false,
    event_id:null,
    registration_form_id:null,
  }
  render() {
    const CancelToken = axios.CancelToken;
    const signal = CancelToken.source();

    const getFormData = async (event_id, registration_form_id, form_id) => {
      this.setState({
        loading:true,
        loadingError:null,
        event_id:event_id,
        registration_form_id:registration_form_id,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/getForm/${event_id}/${registration_form_id}`, {form_id:form_id}, {cancelToken: signal.token});
        if(response.data.status === 1){
            this.setState({
              loading:false,
              data:{...response.data.data, sections:response.data.data.sections.map((item, i)=>{
                  if(i === 0 && item.questions !== undefined && item.questions.length > 0){
                      return   {...item, active: i === 0 ? true : false, questions: item.questions.map((q, i)=>( {...q, active: i === 0 ? true : false} ))};
                  }
                  return   {...item, active: i === 0 ? true : false}                
              })},
            })
        }
        else{
          this.setState({
            loading:false,
            loadingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          loading:false,
          loadingError:error.message
        })
      }
    }
    
    const saveSection = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSection/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          if(data.id === undefined){
            this.setState({
              updating:false,
              data:{...this.state.data, sections:this.state.data.sections.map((item)=> item.sort_order === data.sort_order ? { ...response.data.data, active:true} : item)},
            })
            saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          }else{
            this.setState({
              updating:false,
            })
          }
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    const saveSectionSortBackend = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveSectionSort/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          this.setState({
            updating:false,
          })
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
        
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    } 
    
    const deleteSection = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/deleteSection/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
            this.setState({
              updating:false,
              data:{...this.state.data, sections:this.state.data.sections.filter((item)=> item.id !== data.section_id)},
            })
            saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    
    const deleteQuestion = async (data, sectionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/deleteQuestion/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          const _sections = [...this.state.data.sections];
          _sections[sectionIndex].questions = _sections[sectionIndex].questions.filter((item)=> item.id !== data.question_id);
            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
            saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    
    const cloneQuestion = async (data, sectionIndex, questionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/cloneQuestion/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          const _sections = [...this.state.data.sections];
            _sections[sectionIndex].questions.splice(questionIndex + 1, 0, response.data.data);
            _sections[sectionIndex].questions[questionIndex].active = false;
            _sections[sectionIndex].questions[questionIndex + 1].active = true;
            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
            saveQuestionSortBackend({section_one:_sections[sectionIndex].questions.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {})});
          
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    
    const cloneSection = async (data, sectionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/cloneSection/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          const _sections = [...this.state.data.sections];
          _sections.splice(sectionIndex + 1, 0, response.data.data);

            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
            saveSectionSortBackend(this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
          
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }

    const updateQuestionSection = async (data, sectionSortData, sectionIndex, questionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/updateQuestionSection/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          const _sections = [...this.state.data.sections];
          _sections[sectionIndex].questions[questionIndex] = response.data.data;
          this.setState({
            updating:false,
            data:{...this.state.data, sections:_sections},
          })
          saveQuestionSortBackend(sectionSortData);
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
        
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
      // section_two:_sections[source.droppableId].questions.reduce((ack, item, index)=>({...ack,[item.id]:index}), {})
    }
    
    const saveQuestionSortBackend = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/updateQuestionSort/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          this.setState({
            updating:false,
          })
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
        
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    } 
    
    const addQuestion = async (data, sectionIndex, questionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/addQuestion/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          if(data.id === undefined){
            const _sections = [...this.state.data.sections];
            _sections[sectionIndex].questions[questionIndex] = {...response.data.data, active:true};
            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
            saveQuestionSortBackend({section_one:_sections[sectionIndex].questions.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {})});
          }else{
            this.setState({
              updating:false,
            })
          }
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }
    
    const updateQuestion = async (data, sectionIndex, questionIndex) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/updateQuestion/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          if(data.id === undefined){
            const _sections = [...this.state.data.sections];
            _sections[sectionIndex].questions[questionIndex] = response.data.data;
            this.setState({
              updating:false,
              data:{...this.state.data, sections:_sections},
            })
          }else{
            this.setState({
              updating:false,
            })
          }
        }
        else{
          this.setState({
            updating:false,
            updatingError:response.data.message
          })
        }
       
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
    }

    const cancelAllRequests = () => {
      signal.cancel();
      this.setState({
        data: [],
        loading:false,
        loadingError:null,
        updating:false,
        updatingError:null,
        sortSection: false,
      })
    }

    const handleChange = (sectionIndex) => {
      var _sections = [...this.state.data.sections];
        _sections.forEach((element, k) => {
          element.active = false;
          if(element.questions){
            element.questions.forEach((q)=>{
              q.active = false;
            });
          }
      });
      _sections[sectionIndex].active = true;
      if(_sections[sectionIndex].questions !== undefined && _sections[sectionIndex].questions.length > 0){
        _sections[sectionIndex].questions[0].active = true;
      };
      this.setState({
        data:{...this.state.data, sections:_sections}
      })
    }
    
    const handleQuestionChange = (sectionIndex, questionIndex) => {
      var _sections = [...this.state.data.sections];
      _sections.forEach((element, k) => {
          element.active = false;
          if(element.questions){
            element.questions.forEach((q)=>{
              q.active = false;
            });
          }
      });
      _sections[sectionIndex].active = true;
      _sections[sectionIndex].questions[questionIndex].active = true;
      this.setState({
        data:{...this.state.data, sections:_sections}
      })
    }
    const handleSectionSortGrid = (sections) => {
      this.setState({
        data: {...this.state.data, sections:sections}
      })
      saveSectionSortBackend(sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}));
      handleSectionSort();
    }
    const handleSectionSort = () => {
      this.setState({
        sortSection: !this.state.sortSection
      })
    }
    const handleTooltip = (type, form_id) => {
      let _data= [];
      let _itemIndex = 0;
      const _section = [...this.state.data.sections];
      let _sectionIndex = _section.findIndex(x => x.active === true) !== -1 ? _section.findIndex(x => x.active === true) : 0;
      if (type === 'ADD_QUESTION') {
          let _questionIndex = 0;
          let _clone = JSON.parse(JSON.stringify(_newquestion));

          if(_section[_sectionIndex].questions === undefined || _section[_sectionIndex].questions.length <= 0){
            _section[_sectionIndex].questions = [_clone];
            _section[_sectionIndex].questions[0].form_builder_form_id = parseInt(form_id);
            _section[_sectionIndex].questions[0].form_builder_section_id = parseInt(_section[_sectionIndex].id);
            _section[_sectionIndex].questions[0].active = true;
          }else{
            _questionIndex = _section[_sectionIndex].questions.findIndex(x => x.active === true) !== -1 ? _section[_sectionIndex].questions.findIndex(x => x.active === true) : 0;
            _section[_sectionIndex].questions.splice(_questionIndex + 1, 0, _clone);
            _section[_sectionIndex].questions[_questionIndex].active = false;
            _section[_sectionIndex].questions[_questionIndex + 1].active = true;
            _section[_sectionIndex].questions[_questionIndex + 1].form_builder_form_id = parseInt(form_id);
            _section[_sectionIndex].questions[_questionIndex + 1].form_builder_section_id = parseInt(_section[_sectionIndex].id);
            _section[_sectionIndex].questions.forEach((element, k) => {
              element.sort_order = k;
            });          
          }
      }
      if (type === 'ADD_SECTION') {
        let _clone = JSON.parse(JSON.stringify(_newsection));
        _section.splice(_sectionIndex + 1, 0, _clone);
        _section[_sectionIndex].active = false;
        _section[_sectionIndex + 1].active = true;
        _section[_sectionIndex + 1].form_builder_form_id = parseInt(form_id);
        _section.forEach((element, k) => {
          element.sort_order = k;
        });
            }
      if (type === 'ADD_TITLE_DESCRIPTION') {
        let _questionIndex = 0;
        let _clone = JSON.parse(JSON.stringify(_newtextarea));
          if(_section[_sectionIndex].questions === undefined && _section[_sectionIndex].questions.length <= 0){
            _section[_sectionIndex].questions = [_clone];
            _section[_sectionIndex].questions[0].active = true;
          }else{
            _questionIndex = _section[_sectionIndex].questions.findIndex(x => x.active === true) !== -1 ? _section[_sectionIndex].questions.findIndex(x => x.active === true) : 0;
            _section[_sectionIndex].questions.splice(_questionIndex + 1, 0, _clone);
            _section[_sectionIndex].questions[_questionIndex].active = false;
            _section[_sectionIndex].questions[_questionIndex + 1].active = true;
            _section[_sectionIndex].questions.forEach((element, k) => {
              element.sort_order = k;
            });          
          }
      }
      if (type === 'ADD_PHOTO') {
        let _questionIndex = 0;
        let _clone = JSON.parse(JSON.stringify(_newImageBlock));
          if(_section[_sectionIndex].questions === undefined && _section[_sectionIndex].questions.length <= 0){
            _section[_sectionIndex].questions = [_clone];
            _section[_sectionIndex].questions[0].active = true;
          }else{
            _questionIndex = _section[_sectionIndex].questions.findIndex(x => x.active === true) !== -1 ? _section[_sectionIndex].questions.findIndex(x => x.active === true) : 0;
            _section[_sectionIndex].questions.splice(_questionIndex + 1, 0, _clone);
            _section[_sectionIndex].questions[_questionIndex].active = false;
            _section[_sectionIndex].questions[_questionIndex + 1].active = true;
            _section[_sectionIndex].questions.forEach((element, k) => {
              element.sort_order = k;
            });          
          }
      }
      if (type === 'ADD_VIDEO') {
        let _questionIndex = 0;
        let _clone = JSON.parse(JSON.stringify(_newVideoBlock));
          if(_section[_sectionIndex].questions === undefined && _section[_sectionIndex].questions.length <= 0){
            _section[_sectionIndex].questions = [_clone];
            _section[_sectionIndex].questions[0].active = true;
          }else{
            _questionIndex = _section[_sectionIndex].questions.findIndex(x => x.active === true) !== -1 ? _section[_sectionIndex].questions.findIndex(x => x.active === true) : 0;
            _section[_sectionIndex].questions.splice(_questionIndex + 1, 0, _clone);
            _section[_sectionIndex].questions[_questionIndex].active = false;
            _section[_sectionIndex].questions[_questionIndex + 1].active = true;
            _section[_sectionIndex].questions.forEach((element, k) => {
              element.sort_order = k;
            });          
          }
      }
      this.setState({
        data: {...this.state.data, sections:_section}
      })
    };
    const handleReorder = (source, destination) => {
      const _sections = [...this.state.data.sections];
      
      if (parseInt(source.droppableId) !== parseInt(destination.droppableId)) {
            const sourceSection = _sections[parseInt(source.droppableId)];
            const destSection = _sections[parseInt(destination.droppableId)];
            const sourceQuestions = [...sourceSection.questions]? [...sourceSection.questions] : [];
            const destQuestion = destSection.questions ? [...destSection.questions] : [];
            const [removed] = sourceQuestions.splice(source.index, 1);
  
            destQuestion.splice(destination.index, 0, removed);
  
            _sections[parseInt(source.droppableId)].questions = sourceQuestions.map((item,k)=>({...item, sort_order:k}));
            _sections[parseInt(destination.droppableId)].questions = destQuestion.map((item,k)=>({...item, sort_order:k}));
  
            updateQuestionSection(
              {question_id:removed.id, section_id:_sections[parseInt(destination.droppableId)].id},
              {
                section_one:_sections[source.droppableId].questions.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}), 
                section_one:_sections[destination.droppableId].questions.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {}) 
              },
              destination.droppableId,
              destination.index,
              );
          
          
        // save in backend
      }
      else{
        if(source.index !== destination.index){
          const section = _sections[source.droppableId];
          const copiedQuestions = [...section.questions];
          const [removed] = copiedQuestions.splice(source.index, 1);
          copiedQuestions.splice(destination.index, 0, removed);
          _sections[source.droppableId].questions = copiedQuestions.map((item,k)=>({...item, sort_order:k}));
          this.state.data.sections.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {})
          saveQuestionSortBackend({section_one:_sections[parseInt(source.droppableId)].questions.reduce((ack, item)=>({...ack,[item.id]:item.sort_order}), {})});
          // save in backend
        }
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
      // handleQuestionChange(parseInt(destination.droppableId), destination.index);
    }
    const handleMultiChoiceReorder = (sectionIndex, questionIndex, index, startIndex, endIndex) => {
      const _sections = [...this.state.data.sections];
      var option = _sections[sectionIndex].questions[questionIndex].answers;
      const [removed] = option.splice(startIndex, 1);
      option.splice(endIndex, 0, removed);
      // result.forEach((item, k) => item.index = k);
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }
    const handleMultiChoiceGridReorder = (sectionIndex, questionIndex, startIndex, endIndex, type) => {
      const _sections = [...this.state.data.sections];
      var option;
      if (type === 'rows_items') {
        option = _sections[sectionIndex].questions[questionIndex].grid_questions;
      } else {
        option = _sections[sectionIndex].questions[questionIndex].answers;
      }
      const [removed] = option.splice(startIndex, 1);
      option.splice(endIndex, 0, removed);
      // result.forEach((item, k) => item.index = k);
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }
    const handleSectionArea = (event, name, index) => {
      event.style.height = name === 'desc' ? '28px' : name === 'title' ? '52px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _sections = [...this.state.data.sections];
      _sections[index][name] = event.value;
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }
    const handleTextArea = (event, name, index) => {
      event.style.height = name === 'desc' ? '36px' : name === 'title' ? '26px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _data = [...this.state.data];
      _data[_data.findIndex(x => x.index === index)][name] = event.value;
      this.setState({
        data: _data
      })
    }
    const handleChangeValue = (sectionIndex, questionIndex, event, name) => {
      event.style.height = name === 'description' ? '35px' : name === 'title' ? '42px' : '';
      var _height = event.scrollHeight;
      event.style.height = _height + 'px';
      const _sections = [...this.state.data.sections];
      _sections[sectionIndex].questions[questionIndex][name] = event.value;
      this.setState({
        data: {...this.state.data, sections:_sections}
      })

    }
    const handleChangeDateTime = (sectionIndex, questionIndex,  type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      if (type === 'INCLUDE_TIME') {
        _query.options.time = _query.options.time === 1 ? 0 : 1;
      }
      if (type === 'INCLUDE_YEAR') {
        _query.options.year = _query.options.year === 1 ? 0 : 1;
      }
      if (type === 'TIME_DURATION') {
        _query.options.time_type = _query.options.time_type === 'TIME' ? 'DURATION' : 'TIME';
      }
      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    }
    const handleSectionPanel = (value, type, id) => {
      let _sections = [...this.state.data.sections];
      let _section = [];
      const _id = id;
      console.log(_id);
      for (let i = _id; i < _sections.length; i++) {
        const element = _sections[i];
        if (i !== _id) {
          break;
        } else {
          _section.push(element);
        }
      }
      console.log(_section);
      if (type === "DELETE") {
        _sections = _sections.filter((el) => !_section.includes(el));
      }
      if (type === "DUPLICATE") {
        _sections.splice(_id, 0, ..._section);
        _sections = JSON.parse(JSON.stringify(_sections));
      }
      if (type === 'MERGE') {
        _sections.splice(_id, 1);
        _sections = JSON.parse(JSON.stringify(_sections));
      }
      _sections.forEach((el, k) => {
        el.index = k;
        el.active = false;
      });
      _sections[type === "DELETE" || type === 'MERGE' ? 0 : _id].active = true;

      this.setState({
        data: {...this.state.data, sections:_sections},
      });
    };
    const handleLinerChange = (sectionIndex, questionIndex, value, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      if (type === 'LINEAR_MIN') {
        _query.options.min = value;
      }
      if (type === 'LINEAR_MAX') {
        _query.options.max = value;
      }
      if (type === 'MIN_LABEL') {
        _query.options.min_label = value;
      }
      if (type === 'MAX_LABEL') {
        _query.options.max_label = value;
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    };
    const handleGridChoice = (sectionIndex, questionIndex, value, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      if (type === 'RESPONSE') {
        _query.options.limit = _query.options.limit === 1 ? 0 : 1;
      }
      if (type === 'SHUFFLE') {
        _query.options.shuffle = _query.options.shuffle === 1 ? 0 : 1;
      }
      if (type === 'INPUT_ROW') {
        _query.grid_questions[key].label = value;
      }
      if (type === 'INPUT_COLUMN') {
        _query.answers[key].label = value;
      }
      if (type === 'DELETE_ROW') {
        _query.grid_questions.splice(key, 1);
      };
      if (type === 'DELETE_COLUMN') {
        _query.answers.splice(key, 1);
      };
      if (type === 'ADD_ROW') {
        let _number = _query.grid_questions.length + 1;
        let _option = `Row ${_number}`;
        _query.grid_questions.push({label:_option});
      }
      if (type === 'ADD_COLUMN') {
        let _number = _query.answers.length + 1;
        let _option = `Column ${_number}`;
        _query.answers.push({label:_option});
      }

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
    };
    const handleChangeSectionSelect = (event, index) => {
      const _sections = [...this.state.data.sections];
      _sections[index].next_section = event;

      this.setState({
        data: {...this.state.data, sections:_sections}
      })
      saveSection(_sections[index]);
    }

    const changeQuestionType = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      const _prevType = _query.type;
        _query.type = type;
        if (type === 'time' && _prevType !== 'time') {
          _query.options = JSON.parse(JSON.stringify(_timemoduleOptions));
        }
        if (type === 'date' && _prevType !== 'date') {
          _query.options = JSON.parse(JSON.stringify(_datemoduleOptions));
        }
        if (type === 'linear_scale' && _prevType !== 'linear_scale') {
          _query.options = JSON.parse(JSON.stringify(_linearscaleOption));
        }
        if (type === 'multiple_choice_grid' && _prevType !== 'multiple_choice_grid' && _prevType !== 'tick_box_grid') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegridOptions));
          _query.grid_questions = JSON.parse(JSON.stringify(_mulitplechoicegridRows));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoicegridColumns));
        }
        if (type === 'tick_box_grid' && _prevType !== 'tick_box_grid' && _prevType !== 'multiple_choice_grid') {
          _query.grid_questions = JSON.parse(JSON.stringify(_mulitplechoicegridRows));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoicegridColumns));
          _query.options = JSON.parse(JSON.stringify(_mulitplechoicegridOptions));
        }
        if (type === 'short_answer' && _prevType !== 'short_answer') {
          _query.options = JSON.parse(JSON.stringify(_answerboxshortOption));
          _query.validation = JSON.parse(JSON.stringify(_answerboxshortValidation));
        }
        if (type === 'paragraph' && _prevType !== 'paragraph') {
          _query.options = JSON.parse(JSON.stringify(_answerboxparaOption));
          _query.validation = JSON.parse(JSON.stringify(_answerboxparaValidation));
        }
        if ((type === 'multiple_choice' || type === 'checkboxes' || type === 'drop_down') && _prevType !== 'multiple_choice' && _prevType !== 'checkboxes' && _prevType !== 'drop_down') {
          _query.options = JSON.parse(JSON.stringify(_mulitplechoiceOptions));
          _query.answers = JSON.parse(JSON.stringify(_mulitplechoiceAnswers));
        }
        if ((type === 'multiple_choice' || type === 'drop_down') && (_prevType !== 'multiple_choice' || _prevType !== 'drop_down')) {
          _query.options.section_based = false;
        }
        if ((type === 'multiple_choice' || type === 'drop_down') && _prevType === 'checkboxes') {
          _query.options.response_validation = false;

        }
        if (type === 'checkboxes' && _prevType !== 'checkboxes') {
          _query.options.section_based = false;
          _query.validation = JSON.parse(JSON.stringify(_checkboxvalidation));
          _query.answers.forEach(element => {
            element.next_section = 'CONTINUE'
          });
        }
        if (type === 'file_upload' && _prevType !== 'file_upload') {
          _query.options.section_based = false;
          _query.validation = JSON.parse(JSON.stringify(_checkboxvalidation));
          _query.answers.forEach(element => {
            element.next_section = 'CONTINUE'
          });
        }

        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    
    }

    const changeQuestionRequiredStatus = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
        _query.required = status;
        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const deleteQuestionFront = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];

      _sections[sectionIndex].questions.splice(questionIndex, 1);
      _sections[sectionIndex].questions.forEach((item, k) => item.sort_order = k);
        if(Number(questionIndex) > 0){
          _sections[sectionIndex].questions[ Number(questionIndex) - 1 ].active = true;
        }
        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const setQuestionResponseValidation = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
        _query.options.response_validation = _query.options.response_validation === 1 ? 0 : 1;
        this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    // const cloneQuestion = async (sectionIndex, questionIndex, status) => {
    //   const _sections = [...this.state.data.sections];
    //   const _query = _sections[sectionIndex].questions[questionIndex];

      // const _clone = JSON.parse(JSON.stringify(_query));
      // _sections[sectionIndex].questions.splice(questionIndex, 0, _clone);
      // _sections[sectionIndex].questions.forEach((element, k) => {
      //   element.index = k;
      //   element.active = false;
      // });
      
      // _sections[sectionIndex].questions[questionIndex + 1].active = true;

      //   this.setState({
      //     data: {...this.state.data, sections:_sections}
      //   })
    // }
    
    const setSectionBase = async (sectionIndex, questionIndex, status) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.options.section_based = _query.options.section_based === 1 ? 0 : 1;

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationType = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      if(typeof _query.validation == 'object'){
        _query.validation.type = type;
      }else{
        _query.validation = {type:type};
      }

      if (type === 'NUMBER') {
        _query.validation.rule = 'GREATER_THAN';
      }
      if (type === 'TEXT') {
        _query.validation.rule = 'CONTAINS';
      }
      if (type === 'LENGTH') {
        _query.validation.rule = 'MAX_CHAR_COUNT';
      }
      if (type === 'REGULAR_EXPRESSION') {
        _query.validation.rule = 'CONTAINS';
      }
      _query.validation.value = '';
      _query.validation.error = '';

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }

    const setResponseValidationRule = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.rule = type;
        _query.validation.value = '';
        _query.validation.error = '';
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationFeildValue = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.value = type;
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationFeildValue2 = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.value_2 = type;
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationFeildError = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

        _query.validation.custom_error = type;
     
        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setResponseValidationCheckBoxValue = async (sectionIndex, questionIndex, value) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
      if(typeof _query.validation === "object"){
        _query.validation.value = value;
        _query.validation.type = 'checkboxes';
      }else{
        _query.validation = {
          value:value,
          type:'checkbox'
        }
      }

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setResponseValidationCheckBoxError = async (sectionIndex, questionIndex, error) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      if(typeof _query.validation === "object"){
          _query.validation.custom_error = error;
          _query.validation.type = 'checkboxes';
        }else{
          _query.validation = {
            custom_error:error,
            type:'checkbox'
          }
        }

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setResponseValidationCheckBoxType = async (sectionIndex, questionIndex, rule) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];
        if(typeof _query.validation === "object"){
          _query.validation.rule = rule;
          _query.validation.type = 'checkboxes';
        }else{
          _query.validation = {
            rule:rule,
            type:'checkbox'
          }
        }

        this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setNextSection = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

            _query.answers[key].next_section = type;

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    
    const setAnswersOnChange = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

          _query.answers[key].label = type;

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const setAnswersOnBlur = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

            if (type.replace(/\s/g, '') === '') {
              _query.answers[key].label = `Option ${key + 1}`;
            } else {
              return false;
            }
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const deleteAnswers = async (sectionIndex, questionIndex, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      const removedAnswer =  _query.answers.splice(key, 1);
          if(removedAnswer[0].type !== undefined && removedAnswer[0].type === 'other'){
              _query.options.add_other = false;
          }
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const addAnswers = async (sectionIndex, questionIndex, type) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      let _number = _query.answers.length + 1;
      const _option = {
        label: `Option ${_number}`,
        next_section: 'CONTINUE',
        type: 'regular'

      }
      _query.answers.push(_option);

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
   
    const removeOther = async (sectionIndex, questionIndex, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      _query.options.add_other = false;

      _query.answers.splice(key, 1)

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const addOther = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

          _query.options.add_other = true;

          let _number = _query.answers.length + 1;
          const _option = {
            label: `Other`,
            next_section: 'CONTINUE',
            type: 'other'
          }
          _query.answers.push(_option);

          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }

    const setResponseValidation = async (sectionIndex, questionIndex, type, key) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

          if(typeof _query.options == 'object'){
          _query.options.response_validation = _query.options.response_validation === 1 ? 0 : 1;

          } else {
            _query.options = {response_validation: 1};
          }

          this.setState({
          data: {...this.state.data, sections:_sections}
        })
    }
    
    const setDescription = async (sectionIndex, questionIndex) => {
      const _sections = [...this.state.data.sections];
      const _query = _sections[sectionIndex].questions[questionIndex];

      if(typeof _query.options == 'object'){
        _query.options.description_visible = _query.options.description_visible === 1 ? 0 : 1;
      } else {
        _query.options = {description_visible: 1};
      }
    
          this.setState({
          data: {...this.state.data, sections:_sections}
        })

    }
    
    const previewForm = (event_id, registration_form_id, type) => {
      if(type === 'view'){
        this.props.history.push(`/${event_id}/${registration_form_id}/form/update/${this.state.data.id}/view`);
      }
      else{
        this.props.history.push(`/${event_id}/${registration_form_id}/form/update/${this.state.data.id}`);
      }
    }
    
    const handleFormSave = async (event_id, registration_form_id) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveFormGlobal/${this.state.event_id}/${this.state.registration_form_id}`, this.state.data, {cancelToken: signal.token});
        console.log(response)
        if(response.data.status === 1){
          this.setState({
            updating:false,
            data:{...response.data.data, sections:response.data.data.sections.map((item, i)=>{
                if(i === 0 && item.questions !== undefined && item.questions.length > 0){
                    return   {...item, active: i === 0 ? true : false, questions: item.questions.map((q, i)=>( {...q, active: i === 0 ? true : false} ))};
                }
                return   {...item, active: i === 0 ? true : false}                
            })},
          })
      }
      else{
        this.setState({
          updating:false,
          updatingError:null,
        })
      }
      } catch (error) {
        this.setState({
          updating:false,
          updatingError:error.message
        })
      }
      console.log(this.state.data);
    }
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const _window = window.innerWidth;
      e.target.classList.toggle('ebs-btn-active');
      const _rect = e.target.getBoundingClientRect();
      const _left = Math.round((_window - _rect.left) - 340);
      const _wHeight = window.innerHeight;
      const _position = _wHeight - (_rect.top + 168);
      if (_left <= 0) {
        e.target.classList.add('ebs-position-left');
      } else {
        e.target.classList.remove('ebs-position-left');
      }
      if (_position <= 0 ) {
        e.target.classList.add('ebs-position-top');
      } else {
        e.target.classList.remove('ebs-position-top'); 
      }
    }



    return (
      <CreateQuestionContext.Provider
        value={{
          ...this.state,
          handleChange,
          handleQuestionChange,
          handleChangeValue,
          handleLinerChange,
          handleGridChoice,
          handleChangeDateTime,
          handleTooltip,
          handleReorder,
          handleMultiChoiceReorder,
          handleMultiChoiceGridReorder,
          handleSectionArea,
          handleChangeSectionSelect,
          handleTextArea,
          handleSectionPanel,
          handleSectionSort,
          handleSectionSortGrid,
          changeQuestionType,
          changeQuestionRequiredStatus,
          deleteQuestion,
          deleteQuestionFront,
          setQuestionResponseValidation,
          cloneQuestion,
          cloneSection,
          setSectionBase,
          setResponseValidationType,
          setResponseValidationRule,
          setResponseValidationFeildValue,
          setResponseValidationFeildValue2,
          setResponseValidationFeildError,
          setResponseValidationCheckBoxValue,
          setResponseValidationCheckBoxError,
          setResponseValidationCheckBoxType,
          setNextSection,
          setAnswersOnChange,
          setAnswersOnBlur,
          deleteAnswers,
          addAnswers,
          removeOther,
          addOther,
          setResponseValidation,
          setDescription,
          getFormData,
          cancelAllRequests,
          saveSection,
          addQuestion,
          updateQuestion,
          deleteSection,
          previewForm,
          handleClick,
          handleFormSave,
        }}
      >
        {this.props.children}
      </CreateQuestionContext.Provider>
    );
  }
}

export default withRouter(CreateQuestionContextProvider)
