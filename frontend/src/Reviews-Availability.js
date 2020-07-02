import React from "react";
import {RotateInOutLeft, RotateInOutRight, FadeInOut} from './CustomTransitions'
import Calendar from './Calendar';


class RevAv extends React.Component{
	constructor(props){
		super(props);

		this.Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


		this.state ={
			calendarData: Array(0),
			month: null,
			day: null,
			year: null,
		}
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
			day: 1,
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
			day: 1
		})
	}

	handleTHClick(cellNum){
		this.setState({
			day: cellNum,
		});
	}


	componentDidMount(){
		let newCalData = [{
			year: 2020,
			month: 5,
			day: 15,
			events: [
				{
					startTime: '10AM',
					endTime: '11AM',
					available: true
				},
				{
					startTime: '12AM',
					endTime: '11AM',
					available: false
				},
				{
					startTime: '15AM',
					endTime: '11AM',
					available: true
				},
				{
					startTime: '10AM',
					endTime: '11AM',
					available: true
				},
				{
					startTime: '12AM',
					endTime: '11AM',
					available: false
				},
				{
					startTime: '15AM',
					endTime: '11AM',
					available: true
				},
				{
					startTime: '10AM',
					endTime: '11AM',
					available: true
				},
				{
					startTime: '12AM',
					endTime: '11AM',
					available: false
				},
				{
					startTime: '15AM',
					endTime: '11AM',
					available: true
				}
	
			]
		},
		{
			year: 2020,
			month: 6,
			day: 20,
			events: [
				{
					startTime: '10AM',
					endTime: '11AM',
					available: true,
				},
				{
					startTime: '12AM',
					endTime: '11AM',
					available: false
				},{
					startTime: '15AM',
					endTime: '11AM',
					available: false
				}
	
			]
		}]

		let today = new Date();


		this.setState({
			calendarData: newCalData,
			month: today.getMonth(),
			year: today.getFullYear(),
			day: today.getDate(),
		})
	}

	setDayData(dayData){
		this.setState({
			dayData: dayData,
		});
	}

	render(){
		const date = this.Months[this.state.month] + ' ' + this.state.day + getDateSuffix(this.state.day) + ' ' +  this.state.year;
		const day = this.DaysOfWeek[new Date(this.state.year, this.state.month, this.state.day).getDay()];

		let monthData = [];
		if(this.state.calendarData){
			this.state.calendarData.forEach(function(o){
				if(o.month == this.state.month  && o.year == this.state.year){
					monthData.push(o);

				}
			}.bind(this));
		}
		
		let dayData
		if(monthData){
			monthData.forEach(function(o){
				if(o.day === this.state.day){
					dayData = o.events
				}
			}.bind(this))
		}

		return(
			<div className='row rev-av' style={{height: '-webkit-fill-available'}}>
				<div className='col-lg-6' style={{borderRight: '1px solid white', height: 'initial'}}>
					<FadeInOut changeVal={this.state.month}>
						<Calendar
							monthData={monthData}
							handleTHClick={(cellNum) => this.handleTHClick(cellNum)}
							decrementMonth={() => this.decrementMonth()}
							incrementMonth={() => this.incrementMonth()}
							day={this.state.day}
							month={this.state.month}
							year={this.state.year}
						/>
					</FadeInOut>

					<div>
						<FadeInOut changeVal={date}>
							<h1 style={{borderBottom: '3px solid white', display: 'inline-block', position: 'absolute', top: '73%'}}>
								<span className='day'>
									{day}
								</span>

								<span className='date'>
									{date}
								</span>
							</h1>
						</FadeInOut>
					</div>
					
					<FadeInOut changeVal={this.state.dayData}>
						<TimeSelector 
							style={{position: 'absolute', top: '82%', marginRight: 18 }}
							dayData={dayData}
						/>
					</FadeInOut>
					

				</div>
				<div className="col-lg-6" >
					<h1 className='reviews'>Reviews</h1>
					<div style={{overflow: 'scroll', maxHeight: 572, marginTop: 10}}>
						<Review />
						<Review />
						<Review />
						<Review />
						<Review />
					</div>
				</div>
			</div>
		);
	}
}



function Review(props){
	return(
		<div className='review-container'>
			<div className='row'>
				<div className='col-lg-1'>
					<img src='data:image/jpeg;base64,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'/>
				</div>
				<div className='col-lg-10'>
					<a href='' className='name'>Sarah Steel</a>
				</div>
			</div>
			<div className='row'>
				<div className='col-lg-3'>
					<h2 className="stars">
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
						<i className="fas fa-star"></i>
					</h2>
				</div>
				<div className='col-lg-2'>
					<h2 className='star-in-decimal'>4.8</h2>
				</div>
			</div>
			<h3 className='location-date'>Pittsburgh, USA | Febuary 21st 2020</h3>

			<h3 className='header'><strong>What a great contractor I had, I would 10/10 recommend</strong></h3>
			<p> Lorem ipsum dolor sit amet, 
				consectetur adipisicing elit.
				 Modi vitae fuga possimus magnam
				  ducimus quam dolor qui tenetur
				   facilis error quidem beatae e
				   ius, doloremque repudiandae, 
				   debitis aperiam cum fugiat, in.
			</p>
			<button>Read more</button>
		</div>
	);
}


function TimeSelector(props){
	let dayData;

	if(props.dayData){
		dayData = props.dayData.map((event, index)=>
			<TimeAv key={index} av={event.available} start={event.startTime} end={event.endTime} />
		);
	}

	return(
		<div style={props.style} className='time-selector'>
			{dayData}
		</div>
	);
}

function TimeAv(props){
	return(
		<div style={!props.av ? {background: '#CACACA'}  : null} className='time-av' >
			<button>
				<span className='start'>{props.start}</span> to <span className='end'>{props.end}</span>
			</button>
		</div>
	);
}

function getDateSuffix(val){
	switch(val){
		case 1: return 'st'
		case 2: return 'nd'
		case 3: return 'rd'
		default: return 'th'
	}
}
export default RevAv;