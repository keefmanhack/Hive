import React from "react";
import Calendar from "./Calendar";
import {FlipInOut} from './CustomTransitions'

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		this.NavItems = [
			{
				icon: 'fas fa-chart-line',
				text: 'Dashboard',
			},
			{
				icon: 'far fa-calendar',
				text: 'Schedule',
			},
			{
				icon: 'fas fa-comments',
				text: 'Message Center',
			},
			{
				icon: 'fas fa-cogs',
				text: 'Settings',
			},

		]

		this.state ={
			year: null,
			month: null,
			day: null,
			calendarData: Array(0),
			selectedNavIndex: 0,

		}
	}

	componentDidMount(){
		let today = new Date();

		this.setState({
			year: today.getFullYear(),
			month: today.getMonth(),
			day: today.getDate(),
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
		})
	}

	setSelectedNavIndex(i){
		this.setState({
			selectedNavIndex: i,
		})
	}

	render(){
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Bounce Rate by Week of Year"
			},
			axisY: {
				title: "Bounce Rate",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Week of Year",
				prefix: "W",
				interval: 2
			},
			height: 250,
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 }
				]
			}]
		}
		return(
			<div className='dashboard-container'>
				<div className='dashboard-nav row'>
					<Nav 
						items={this.NavItems}
						handleClick={(i) => this.setSelectedNavIndex(i)}
						selectedIndex={this.state.selectedNavIndex}
					/>
				</div>

				<div className='row'>
					<div className='col-lg-8'>
						<div className='row'>
							<div className='col-lg-12'>
								<div className='upcomming'>
									<table>
										<thead>
											<tr>
												<td>Date</td>
												<td>Venue</td>
												<td>Address</td>
												<td>Time</td>
												<td>Payment Status</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<h1>Friday</h1>
													<h2>June 21st</h2>
												</td>
												<td>
													<h3>Hard Rock Cafe</h3>
												</td>
												<td>
													<h4>1101 Pennsylvania Ave. New York, NY</h4>
												</td>
												<td>
													<h5>8:00PM - 9:00PM</h5>
												</td>
												<td>
													<h1 className='payment-status'>Paid</h1>
												</td>
											</tr>
											<tr>
												<td>
													<h1>Friday</h1>
													<h2>June 21st</h2>
												</td>
												<td>
													<h3>Hard Rock Cafe</h3>
												</td>
												<td>
													<h4>1101 Pennsylvania Ave. New York, NY</h4>
												</td>
												<td>
													<h5>8:00PM - 9:00PM</h5>
												</td>
												<td>
													<h1 className='payment-status'>Paid</h1>
												</td>
											</tr>
											<tr>
												<td>
													<h1>Friday</h1>
													<h2>June 21st</h2>
												</td>
												<td>
													<h3>Hard Rock Cafe</h3>
												</td>
												<td>
													<h4>1101 Pennsylvania Ave. New York, NY</h4>
												</td>
												<td>
													<h5>8:00PM - 9:00PM</h5>
												</td>
												<td>
													<h1 className='payment-status'>Paid</h1>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='chart-container' style={{height: 250, marginTop: 10}}>
									<CanvasJSChart style={{height: 'inherit'}} options={options}/>
								</div>
							</div>
							<div className='col-lg-6 financial-info'>
								<table>
									<tbody>
										<tr>
											<td>
												<h2>Average Payment</h2>
											</td>
											<td>
												<h3>$100.00</h3>
											</td>
										</tr>
										<tr>
											<td>
												<h2>Average Hours</h2>
											</td>
											<td>
												<h3>5</h3>
											</td>
										</tr>
										<tr>
											<td>
												<h2>Total Payment</h2>
											</td>
											<td>
												<h3>$400.00</h3>
											</td>
										</tr>
										<tr>
											<td>
												<h2>Total Hours</h2>
											</td>
											<td>
												<h3>45</h3>	
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className='col-lg-4'>
						<div className='request-center'>
							<h2>Friday, June 21st</h2>
							<hr/>

							<RequestItem />

							<h2>Saturday, June 22st</h2>
							<hr/>

							<RequestItem />
							<RequestItem />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class RequestItem extends React.Component{
	constructor(props){
		super(props);

		this.state={
			showDropDown: false,
		}
	}

	toggleDropDown(){
		const ddState = this.state.showDropDown;

		this.setState({
			showDropDown: !ddState,
		})
	}

	render(){
		const icon = this.state.showDropDown ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>;

		return(
			<div className='request'>
				<div className='row'>
					<div className='col-lg-2'>
						<img src="/photos/generic_person.jpg" alt=""/>
					</div>
					<div className='col-lg-10'>
						<h1>Hard Rock Cafe</h1>
						<h3>1101 Pennsylvania Ave. New York, NY</h3>
						<h4>8:00PM - 9:00PM</h4>
					</div>
				</div>
				
					<FlipInOut condition={this.state.showDropDown}>
						<DropDown />
					</FlipInOut>
				
				<div className='row'>
					<div className='col-lg-12'>
						<button onClick={() => this.toggleDropDown()}>{icon}</button>
					</div>
				</div>
			</div>
		);
	}
}

function DropDown(props){
	return(
		<div className='drop-down'>
			<hr/>
			<div className='actions'>
				<div className='row'>
					<div className='col-lg-4'>
						<button className='accept'><i className="fas fa-check"></i> Accept</button>
					</div>
					<div className='col-lg-4'>
						<button className='decline'><i className="fas fa-times"></i> Decline</button>
					</div>
					<div className='col-lg-4'>
						<button className='message'><i className="far fa-comment"></i> Message</button>
					</div>
				</div>
			</div>
			<div className='details'>
				<div className='row'>
					<div className='col-lg-12'>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quasi sint laboriosam perferendis minus rem nihil! Asperiores totam natus animi, magnam tempora cum eligendi quaerat perferendis. Sint aspernatur et tempore.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Nav(props){
	const icons = props.items.map((item, index) =>
		<div className='col col-auto' style={index !== props.selectedIndex ? {opacity: .5}: null}>
			<Icon
				style={{background: 'purple'}}
				key={index} 
				item={item} 
				handleClick={() => props.handleClick(index)}
			/>
		</div>
	)

	return(
		<div className='row'>
			{icons}
		</div>
	)
}


function Icon(props){
	return(
		<div onClick={() => props.handleClick()} style={{textAlign: 'center'}}>
			<button><i className={props.item.icon}></i></button>
			<h5>{props.item.text}</h5>
		</div>
		
	)
}


export default Dashboard;