import * as React from 'react';
const AppNavbar = ({...props}) => {
	return (
		<header className="ebs-header">
			<div className="container">
				<div className="row d-flex align-items-center">
					<div className="col-7">
						<div className="ebs-title">Form Bulider</div>
					</div>
					{props.showpanel && <div className="col-5 d-flex justify-content-end">
						<div className="ebs-panel-settings">
							<span className="ebs-btn"><img src={require('img/ico-preview.svg')} alt="" /></span>
							<span className="ebs-btn"><img src={require('img/ico-settings.svg')} alt="" /></span>
						</div>
					</div>}
				</div>
			</div>
		</header>
	)
}
export default AppNavbar
