import React from "react";
import {RotateInOutLeft, RotateInOutRight} from './CustomTransitions'


class RevAv extends React.Component{
	constructor(props){
		super(props);

		this.Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		this.state ={
			year: null,
			month: null,

		}
	}


	componentDidMount(){
		let today = new Date();

		this.setState({
			year: today.getFullYear(),
			month: today.getMonth(),
		})
	}

	incrementMonth(){
		let monthCopy = this.state.month;
		let yearCopy = this.state.year;

		if(monthCopy+1 > 11){
			monthCopy = 0;
			yearCopy++;
		}else{
			monthCopy++;
		}

		this.setState({
			month: monthCopy,
			year: yearCopy,
		})
	}

	decrementMonth(){
		let monthCopy = this.state.month;
		let yearCopy = this.state.year;

		if(monthCopy-1 < 0){
			monthCopy = 11;
			yearCopy--;
		}else{
			monthCopy--;
		}

		this.setState({
			month: monthCopy,
			year: yearCopy,
		})
	}

	render(){
		const date = this.Months[this.state.month] + ' 1st, ' +  this.state.year;
		return(
			<div className='row rev-av' style={{height: '-webkit-fill-available'}}>
				<div className='col-lg-6' style={{borderRight: '1px solid white', height: 'initial'}}>
					<Calendar 
						year={this.state.year} 
						month={this.state.month} 
						incrementMonth={() => this.incrementMonth()}
						decrementMonth={() => this.decrementMonth()}
					/>

					<div>
						<h1 style={{display: 'initial', borderBottom: '3px solid white'}}>
							<span className='day'>
								Saturday
							</span>

							<span className='date'>
								{date}
							</span>
						</h1>
					</div>
					
					<TimeSelector />
					

				</div>
			</div>
		);
	}
}


function TimeSelector(props){
	return(
		<div style={props.style} className='time-selector'>
			<TimeAv />
			<TimeAv />
			<TimeAv style={{background: '#CACACA', cursor: 'normal'}}/>
			<TimeAv />
			<TimeAv />
		</div>
	);
}

function TimeAv(props){
	return(
		<div style={props.style} className='time-av' >
			<button style={{display: 'inline'}}>
				<span className='start'>10 PM</span> to <span className='end'>11 PM</span>
			</button>
		</div>
	);
}


class Calendar extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			showLeft: false,
			showRight: false,
		}
	}

	setShowLeft(show){
		this.setState({
			showLeft: show,
		})
	}

	setShowRight(show){
		this.setState({
			showRight: show,
		})
	}

	render(){
		let rowData = getCalendarData(this.props.year, this.props.month);
		let greyOut =[];

		const rows = rowData.map((data, index) =>
			<CellRow greyOutZone={index===0 || index===rowData.length-1 ? findGreyOut(rowData, index) : null} cellText={data}/>
		);

		return(
			<div style={this.props.style}  className='calendar' style={{position:'relavtive'}}>
				<table className="table">
						<thead>
						    <tr>
						      <th scope="col">Sun.</th>
						      <th scope="col">Mon.</th>
						      <th scope="col">Tue.</th>
						      <th scope="col">Wed.</th>
						      <th scope="col">Thu.</th>
						      <th scope="col">Fri.</th>
						      <th scope="col">Sun.</th>
						    </tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
				</table>
				<div className='prev-detector' onMouseEnter={() => this.setShowLeft(true)} onMouseLeave={() => this.setShowLeft(false)}>
					<RotateInOutLeft condition={this.state.showLeft}>
						<button  onClick={() => this.props.decrementMonth()} className='prev-btn-cont'>
							<i className="fas fa-arrow-left"></i>
						</button>
					</RotateInOutLeft>
				</div>

				<div className='next-detector' onMouseEnter={() => this.setShowRight(true)} onMouseLeave={() => this.setShowRight(false)}>
					<RotateInOutRight condition={this.state.showRight}>
						<button onClick={() => this.props.incrementMonth()} className='next-btn-cont'>
							<i class="fas fa-arrow-right"></i>
						</button>
					</RotateInOutRight>
				</div>
			</div>
		);
	}
}



class CellRow extends React.Component{


	render(){
		let greyOutZone = this.props.greyOutZone;
		const cells = this.props.cellText.map((cell, index) =>
			<Cell style={shouldGreyOut(cell, greyOutZone) ? {background: 'lightgrey'} : null} key={index} text={cell} />
		);
			


		return(
			<tr>
				{cells}
			</tr>
		);
	}
}

class Cell extends React.Component{
	render(){
		return(
			<th style={this.props.style}> 
				<span>
					{this.props.text}
				</span>
			</th>
		);
	}
}

export default RevAv;

function getCalendarData(year, month){
	let returnVal = [];
	//DATE INFORMATION
	var date = new Date(year, month, 1);
	var daysInThisMonth = numOfDaysInMonth(date.getFullYear(), date.getMonth());
	var previousMonthDays = date.getDay();
	var nextMonthDays = 6 - (new Date(date.getFullYear(), date.getMonth(), daysInThisMonth)).getDay();
	var totalDaysToShow = nextMonthDays + previousMonthDays + daysInThisMonth;
	var lastDayOfPreviousMonth;

	if(date.getMonth()-1 <0){
		lastDayOfPreviousMonth = numOfDaysInMonth(date.getFullYear(), 11);
	}else{
		lastDayOfPreviousMonth = numOfDaysInMonth(date.getFullYear(), date.getMonth()-1);
	}
	//END OF DATE INFORMATION

	var cols = 7;
	var rows = Math.floor(totalDaysToShow/7);
	var ct =1;

	for(var i =0; i< rows; i++){

		var rowText =[];
		for(var j =0; j<cols; j++){
			if (ct <= previousMonthDays){
				rowText.push(lastDayOfPreviousMonth-previousMonthDays+j +1);
			}else if (ct> (daysInThisMonth+previousMonthDays)){
				rowText.push(ct - daysInThisMonth - previousMonthDays);
			}else{
				rowText.push(ct-previousMonthDays);
			}
			

			ct++;
		}
		returnVal[i] = rowText;
		
	}
	return returnVal;
}

function shouldGreyOut(cell, greyOutZone){
	let returnVal = false;
	if(greyOutZone){
		greyOutZone.forEach(function(o){
			if(cell === o){
				returnVal = true;
			}
		})
	}

	return returnVal

}

function findGreyOut(dataRow, index){

	let returnVal = [];
	if(index===0){
		let data = dataRow[0];
		

		for(var i =0; i < data.length; i++){
			if(1 === data[i]){
				returnVal = data.slice(0,i);
			}
		}
	}else if (index === dataRow.length-1) {
		let data = dataRow[dataRow.length-1];

		for(var i =0; i < data.length; i++){
			if(1 === data[i]){
				returnVal = data.slice(i, data.length);
			}
		}
	}

	return returnVal;
}


function numOfDaysInMonth(year, month){
	for(var i =1; i<33; i++){
		var date = new Date(year, month, i);

		if (date.getMonth() !== month){
			return i-1;
		}
	}
}