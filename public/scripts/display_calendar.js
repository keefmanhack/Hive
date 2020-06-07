var Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentMonth;
var currentYear;
var classData;


initializeCalendar();

function showCalendar(year, month){
	clearCalendar();

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

	$(".display.calendar h1")[0].textContent = Months[date.getMonth()];
	$(".display.calendar h2")[0].textContent = date.getFullYear();

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
			text += `<th>` + `<span>` + rowText[k] + `</span>` + `</th>`;
		}

		text += `</tr>`;
  		$(".display.calendar tbody").append(text);
	}

	NotInMonth(); //grey out unused dates
}

//*************************
//CALENDAR HELPER FUNCTIONS
//*************************
function initializeCalendar(){
	var date = new Date();
	currentMonth = date.getMonth();
	currentYear = date.getFullYear();
	showCalendar(currentYear, currentMonth);
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
	$(".display.calendar tbody").empty();
}

function NotInMonth(){
	var firstLast = [];
	for(var i =0; i<$(".display.calendar tbody th").length; i++){
		if($(".display.calendar tbody th span")[i].textContent == 1){
			firstLast.push(i);
		}
	}

	if(firstLast[0] >0){
		$(".display.calendar tbody th").slice(0, firstLast[0]).addClass("muted");
	}
	if(firstLast[1]){
		$(".display.calendar tbody th").slice(firstLast[1], $(".calendar tbody th").length).addClass("muted");
	}
}

$(".display.calendar #month-back").click(function(){
	if(currentMonth-1 < 0){
		currentMonth = 11;
		currentYear--;
	}else{
		currentMonth--;
	}
	showCalendar(currentYear, currentMonth);
	
});

$(".display.calendar #month-next").click(function(){
	if(currentMonth+1 > 11){
		currentMonth = 0;
		currentYear++;
	}else{
		currentMonth++;
	}
	showCalendar(currentYear, currentMonth);
	
});