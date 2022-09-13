import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { CreateQuestionContext } from "app/contexts/CreateQuestionContext";
import { FormDataContext } from "app/contexts/FormDataContext";
const AppNavbar = ({...props}) => {
	const {data, previewForm} = useContext(CreateQuestionContext);
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
							<span onClick={() => previewForm()} className="ebs-btn"><img src={require('img/ico-preview.svg')} alt="" /></span>
							<span className="ebs-btn"><img src={require('img/ico-settings.svg')} alt="" /></span>
							<span onClick={() => handleSave(data,'SAVE')} className="ebs-btn"><i className="material-icons">save</i></span>
						</div>
					</div>}
				</div>
			</div>
		</header>
	)
}
export default withRouter(AppNavbar)
