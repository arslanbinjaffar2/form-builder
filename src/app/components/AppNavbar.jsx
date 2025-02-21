import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import { FormDataContext } from "app/contexts/FormDataContext";
const AppNavbar = ({...props}) => {
	const {data, previewForm, handleFormSave} = useContext(CreateQuestionContext);
	const {handleSave} = useContext(FormDataContext);
	return (
		<header className="ebs-header">
			<div className="container">
				<div className="row d-flex align-items-center">
					<div className="col-7">
						<div className="ebs-title">Form Bulider</div>
					</div>
					{props.showpanel && <div className="col-5 d-flex justify-content-end">
						<div className="ebs-panel-settings">
							{!props.view && <span onClick={() => handleSave(props.event_id, props.registration_form_id, 'SAVE')} className="ebs-btn"><img src={require('img/ico-back.svg')} alt="" /></span>}
							{props.view ? 
								<span onClick={() => previewForm(props.event_id, props.registration_form_id, 'edit')} className="ebs-btn"><img src={require('img/ico-edit.svg')} alt="" /></span>
								:
								<span onClick={() => previewForm(props.event_id, props.registration_form_id, 'view')} className="ebs-btn"><img src={require('img/ico-preview.svg')} alt="" /></span>
							
							}
							<span onClick={() => handleFormSave(props.event_id, props.registration_form_id)} className="ebs-btn"><i className="material-icons">save</i></span>
						</div>
					</div>}
				</div>
			</div>
		</header>
	)
}
export default withRouter(AppNavbar)
