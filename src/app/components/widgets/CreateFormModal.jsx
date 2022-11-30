import React, {useState, useContext, useEffect} from 'react'
import { FormDataContext } from "app/contexts/FormDataContext";

const CreateFormModal = ({event_id, registration_form_id, open, close}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
	const {createForm, processError, processing, cancelAllRequests} = useContext(FormDataContext);

    const addForm = async () => {
        setError(false);
        if(title === '' || description === ''){
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
                    <span className="material-icons">cancel</span>
                </div>
            </div>
            <div className="ebs-create-form-modal-body">
                {processError !== null && <span className="error">{processError}</span>}
                {error && <span className="error">Title and Description both feilds are required</span>}
                <div className="ebs-input-response">
                    <input placeholder="Title" type="text" onChange={(e)=>{setTitle(e.currentTarget.value)}}  />
                </div>
                <div className="ebs-input-response">
                    <textarea placeholder="description" type="text" onChange={(e)=>{setDescription(e.currentTarget.value)}} />
                </div>
                <div>
                    <button type="submit" className='ebs-btn' onClick={()=>{addForm()}} >Create Form</button>
                    {processing && <span>Processing....</span>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateFormModal