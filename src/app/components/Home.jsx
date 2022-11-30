import  React , {useState, useContext} from 'react';
import AppNavbar from '@/AppNavbar';
import HomeFormsList from './const/HomeFormsList';
import CreateFormModal from './widgets/CreateFormModal';
import { FormDataContext } from "app/contexts/FormDataContext";

 const Home = (props) => {
	const {processing} = useContext(FormDataContext);
  const [open, setOpen] = useState(false)
  return (
    <React.Fragment>
     <AppNavbar />
     <main className="ebs-main" role="main">
       <div className="ebs-template-box">
         <div className="container">
         <div className="ebs-form-title-home">Start a new form</div>
         <div className="row d-flex">
           <div className="col-2">
             <div className="ebs-btn-add" onClick={()=>{setOpen(true)}}></div>
             <div className="ebs-add-new">Blank</div>
           </div>
         </div>
         </div>
       </div>
       <HomeFormsList event_id={props.match.params.event_id} registration_form_id={props.match.params.registration_form_id} />
       <CreateFormModal event_id={props.match.params.event_id} registration_form_id={props.match.params.registration_form_id} open={open} close={()=>{setOpen(false)}}/>
     </main>
    </React.Fragment> 
   );
}

export default Home;