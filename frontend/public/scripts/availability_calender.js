var Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentMonthAv;
var currentYearAv;
var thArrAv = [];
$('#on').datepicker();

initializeCalendar();
addNewEventListeners();

function showCalendar(year, month){
	clearCalendar();
	thArrAv.splice(0, thArrAv.length);


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
	var text = "";

	$(".edit-availability .availability.calendar h1")[0].textContent = Months[date.getMonth()];
	$(".edit-availability .availability.calendar h2#yearAv")[0].textContent = date.getFullYear();

	var thCt = 0;
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

		text = `<tr>`;
		for(var k =0; k<rowText.length; k++){
			text += `<th id='`+ thCt +`'>` + `<span>` + rowText[k] + `</span>` + `</th>`;
			thArrAv.push({
				thID : thCt,
				day: rowText[k],
				month: Months[date.getMonth()],
				year: date.getFullYear()
			});
			thCt++;
		}
		

		text += `</tr>`;
  		$(".edit-availability .availability.calendar tbody").append(text);
	}

	NotInMonth(); //grey out unused dates
}

//*************************
//CALENDAR HELPER FUNCTIONS
//*************************
function initializeCalendar(){
	var date = new Date();
	currentMonthAv = date.getMonth();
	currentYearAv = date.getFullYear();
	showCalendar(currentYearAv, currentMonthAv);
}

function numOfDaysInMonth(year, month){
	for(var i =1; i<33; i++){
		var date = new Date(year, month, i);

		if (date.getMonth() !== month){
			return i-1;
		}
	}
}

function clearCalendar(){
	$(".edit-availability .availability.calendar tbody").empty();
}

function NotInMonth(){
	var firstLast = [];
	for(var i =0; i<$(".edit-availability .availability.calendar tbody th").length; i++){
		if($(".edit-availability .availability.calendar tbody th span")[i].textContent == 1){
			firstLast.push(i);
		}
	}

	if(firstLast[0] >0){
		$(".edit-availability .availability.calendar tbody th").slice(0, firstLast[0]).addClass("muted");
	}
	if(firstLast[1]){
		$(".edit-availability .availability.calendar tbody th").slice(firstLast[1], $(".edit-availability .calendar tbody th").length).addClass("muted");
	}
}

$(".edit-availability .availability.calendar #month-back-availability").click(function(){
	if(currentMonthAv-1 < 0){
		currentMonthAv = 11;
		currentYearAv--;
	}else{
		currentMonthAv--;
	}
	showCalendar(currentYearAv, currentMonthAv);
	addNewEventListeners();
	
});

$(".edit-availability .availability.calendar #month-next-availability").click(function(){
	console.log(currentMonthAv);
	if(currentMonthAv+1 > 11){
		currentMonthAv = 0;
		currentYearAv++;
	}else{
		currentMonthAv++;
	}
	showCalendar(currentYearAv, currentMonthAv);
	addNewEventListeners();
	
});

