import React, { createContext, Component }  from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const data = [
  { 
    id: 0,
    title: 'Event Registration',
    lastModified: '2021-08-17 11:00',
    screenShot: '',
    published: true,
    form:[]
  },{
    id: 1,
    title: 'Party Invite',
    lastModified: '2021-04-11 15:00',
    screenShot: '',
    published: true,
    form:[]
  }
];



export const FormDataContext = createContext();
class FormDataContextProvider extends Component {
  state = {
    data: [],
    processing:false,
    processError:null,
    currentForm:null,
    event_id:null,
    registration_form_id:null,
  }
  render() {
    const CancelToken = axios.CancelToken;
    const signal = CancelToken.source();

    const handleSave = (event_id, registration_form_id, type) => {
      // const data = [...this.state.data];
      // const _question  = {
      //   id: this.state.data.length,
      //   title: content[0].title,
      //   description: content[0].desc,
      //   lastModified: new Date(),
      //   screenShot: '',
      //   published: true,
      //   form: content,
      // }
      // data.push(JSON.parse(JSON.stringify(_question)));
      // this.setState({
      //   data: data
      // },() => {
        if (type === 'SAVE') {
          this.props.history.push(`/${event_id}/${registration_form_id}`)
        } else {
          // localStorage.setItem('id',this.state.data.length)
          this.props.history.push(`/${event_id}/${registration_form_id}/form/view/${this.state.currentForm}`);
        }
      // })
    }
    
    const createForm = async (event_id, registration_form_id, content, callBack) => {
      console.log(content);
      const data = [...this.state.data];
      this.setState({
        processing:true,
        processError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/createForm/${event_id}/${registration_form_id}`, content, {cancelToken: signal.token});
        data.push(response.data.data);
        console.log(response.data.data);
        if(response.data.status === 1){
            this.setState({
              processing:false,
              data:data,
              currentForm:response.data.data
            }
            ,
            () => {
                callBack();
                this.props.history.push( `/${event_id}/${registration_form_id}/form/update/${response.data.data.id}`);
              }
            )
        }
        else{
          this.setState({
            processing:false,
            processError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          processing:false,
          processError:error.message
        })
      }
    }

    const getForms = async (event_id, registration_form_id) => {
      this.setState({
        processing:true,
        processError:null,
        event_id:event_id,
        registration_form_id:registration_form_id,
      })
      try {
        const response = await axios.get(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/getForms/${event_id}/${registration_form_id}`, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
            this.setState({
              processing:false,
              data:response.data.data
            }
            )
        }
        else{
          this.setState({
            processing:false,
            processError:response.data.message
          })
        }
       
      } catch (error) {
        console.error(error);
        this.setState({
          processing:false,
          processError:error.message
        })
      }
    }
    const cancelAllRequests = () => {
      signal.cancel();
      this.setState({
        processing:false,
        processError:null,
        data:[]
      })
    }

    const setCurrentForm = (event_id, registration_form_id, id) => {
      console.log(this.state.data.find((item)=>(item.id === id)), "helellee");
      this.setState({
        currentForm:this.state.data.find((item)=>(item.id === id)).id
      }
      ,
      () => {
          this.props.history.push(`/${event_id}/${registration_form_id}/form/update/${id}`);
        }
      )
    }

    const saveFormSortBackend = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveFormSort/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
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
    
    const saveFormStatus = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/saveFormStatus/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          this.setState({
            updating:false,
            data:this.state.data.map((item)=>{ if(item.id !==  data.form_id){ return item}else{ return {...item, active:data.status} } })
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
    
    const saveFormTitle = async (data, callBack) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/renameForm/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          this.setState({
            updating:false,
            data:this.state.data.map((item)=>{ if(item.id !==  data.form_id){ return item}else{ return {...item, title:data.title} } })
          })
          callBack();
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

    const deleteForm = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/deleteForm/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        if(response.data.status === 1){
          this.setState({
            updating:false,
            data:[...response.data.data.data]
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
    
    const copyForm = async (data) => {
      this.setState({
        updating:true,
        updatingError:null,
      })
      try {
        const response = await axios.post(`${process.env.REACT_APP_EVENTBUIZZ_API_URL}/copyForm/${this.state.event_id}/${this.state.registration_form_id}`, data, {cancelToken: signal.token});
        console.log(response.data.data);
        if(response.data.status === 1){
          this.setState({
            updating:false,
            data:[...response.data.data.data]
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
    return (
     <FormDataContext.Provider value={{...this.state,handleSave, createForm, copyForm, deleteForm, cancelAllRequests, saveFormTitle, getForms, setCurrentForm, saveFormSortBackend, saveFormStatus}}>
        {this.props.children}
     </FormDataContext.Provider>
    )
  }
}
export default withRouter(FormDataContextProvider)
