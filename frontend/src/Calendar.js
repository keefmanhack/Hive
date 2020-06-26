import React from "react";
import {RotateInOutLeft, RotateInOutRight, FadeInOut} from './CustomTransitions'

class Calendar extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			showLeft: false,
			showRight: false
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
			<CellRow  
			handleTHClick={(cellNum) => this.props.handleTHClick(cellNum)} 
			greyOutZone={index===0 || index===rowData.length-1 ? findGreyOut(rowData, index) : null} 
			cellText={data}
			selectedCell={this.props.day}
			monthData={this.props.monthData}
			/>
		);

		return(
			<div style={this.props.style}  className='calendar' style={{position:'absolute', marginRight: 18}}>
				<table className="table" style={{margin: 0}}>
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
				<div className='prev-detector' onMouseOver={() => this.setShowLeft(true)} onMouseLeave={() => this.setShowLeft(false)}>
					<RotateInOutLeft condition={this.state.showLeft}>
						<button  onClick={() => this.props.decrementMonth()} className='prev-btn-cont'>
							<i className="fas fa-arrow-left"></i>
						</button>
					</RotateInOutLeft>
				</div>

				<div className='next-detector' onMouseOver={() => this.setShowRight(true)} onMouseLeave={() => this.setShowRight(false)}>
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
			<Cell 
				handleTHClick={() => this.props.handleTHClick(cell)} 
				greyOut={shouldGreyOut(cell, greyOutZone)} 
				key={index} 
				text={cell}
				style={this.props.selectedCell == cell ? selectedStyle : null}
				cellData={!shouldGreyOut(cell, greyOutZone) ? findCellData(this.props.monthData, cell) : null}
			/>
		);
			


		return(
			<tr>
				{cells}
			</tr>
		);
	}
}

function findCellData(monthData, cell){
	let returnVal = null; 
	monthData.forEach(function(o){
		if(o.day == cell){
			returnVal = o;
		}
	})
	return returnVal;
}

class Cell extends React.Component{
	render(){
		const greyOut = this.props.greyOut ? ' grey-out ' : null;

		let cellDatas;
		if(this.props.cellData){
			cellDatas = this.props.cellData.events.map((data, index) =>
				<CellData key={index} data={data}/>
			)
		}
		return(
			<th onClick={!greyOut ? () => this.props.handleTHClick() : null} style={this.props.style} className={greyOut}> 
				<span>
					{this.props.text}
				</span>
			{cellDatas}
			</th>
		);
	}
}

function CellData(props){
	const data = props.data;
	const formatData = data.startTime + ' to ' + data.endTime;
	const notAvStyle = !data.available ? {background: 'lightgrey'} : null;
	return(
		<div className='cell-data' style={notAvStyle}>
			<h1>{formatData}</h1>
		</div>
	);
}



export default Calendar;


const selectedStyle = {
	'-webkit-box-shadow': 'inset 0px 0px 26px -9px #E5FDFE',
    '-moz-box-shadow': 'inset 0px 0px 26px -9px #E5FDFE',
    'boxShadow': 'inset 0px 0px 26px -9px #E5FDFE',
}

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