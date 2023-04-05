import React, {useState, useContext, useEffect} from 'react'
import { FormDataContext } from "app/contexts/FormDataContext";

const CreateFormModal = ({event_id, registration_form_id, open, close}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
	const {createForm, processError, processing, cancelAllRequests} = useContext(FormDataContext);

    const addForm = async () => {
        setError(false);
        if(title === ''){
            setError(true);
            return;
        }
        setTitle('');
        setDescription('');
        await createForm(event_id, registration_form_id, {
            title,
            description,
        }, ()=> {close()});
    }

    useEffect(() => {

      return () => {
        if(processing){
            cancelAllRequests();
        }
      }

    }, [])
    

  return (
    <div className="ebs-create-form-modal-backdrop" onClick={(e)=>{(e.target === e.currentTarget && !processing) && close() }} style={{display: open ? "flex" : "none"}}>
        <div className="ebs-create-form-modal-content">
            <div className="ebs-create-form-modal-head">
                <h4>Create Form</h4>
                <div onClick={()=>{!processing && close()}} style={{cursor:'pointer'}}>
                    <span className="material-icons">close</span>
                </div>
            </div>
            <div className="ebs-create-form-modal-body">
                <div className="ebs-input-response">
                    <input placeholder="Title" type="text" style={{maxWidth:'100%'}} onChange={(e)=>{setTitle(e.currentTarget.value)}}  />
                </div>
                <div className="ebs-input-response">
                    <textarea placeholder="description" type="text" style={{maxWidth:'100%'}} onChange={(e)=>{setDescription(e.currentTarget.value)}} />
                </div>
                {processError !== null &&  <div className="ebs-input-response">
                    { <span className="ebs-error-container">{processError}</span>}
                </div>}
                {error && <div className="ebs-input-response">
                    {<span className="ebs-error-container">Title feild is required</span>}
                </div>}
                <div>
                    <button type="submit"  style={{padding: '8px 15px',fontSize: '13px', backgroundColor:"#333333", fontWeight:'bold', width:"100%"}} className='btn' onClick={()=>{addForm()}} >{processing ? 'Processing....' : 'Create' }</button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateFormModal