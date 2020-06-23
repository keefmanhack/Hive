import React from "react";

class RevAv extends React.Component{
	render(){
		return(
			<div className='row'>
				<div className='col-lg-6'>
					<Calendar />
				</div>
			</div>
		);
	}
}

class Calendar extends React.Component{
	render(){
		return(
			<div className='calendar'>
			</div>
		);
	}
}

export default RevAv;