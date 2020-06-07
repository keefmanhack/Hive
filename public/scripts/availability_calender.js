var Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentMonth;
var currentYear;
var classData;
var thArr = [];
$('#on').datepicker();

initializeCalendar();
addNewEventListeners();

function showCalendar(year, month){
	clearCalendar();
	thArr.splice(0, thArr.length);


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

	$(".edit-availability .calendar h1")[0].textContent = Months[date.getMonth()];
	$(".edit-availability .calendar h2")[0].textContent = date.getFullYear();

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
			thArr.push({
				thID : thCt,
				day: rowText[k],
				month: Months[date.getMonth()],
				year: date.getFullYear()
			});
			thCt++;
		}
		

		text += `</tr>`;
  		$(".edit-availability .calendar tbody").append(text);
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
	$(".edit-availability .calendar tbody").empty();
}

function NotInMonth(){
	var firstLast = [];
	for(var i =0; i<$(".edit-availability .calendar tbody th").length; i++){
		if($(".edit-availability .calendar tbody th span")[i].textContent == 1){
			firstLast.push(i);
		}
	}

	if(firstLast[0] >0){
		$(".edit-availability .calendar tbody th").slice(0, firstLast[0]).addClass("muted");
	}
	if(firstLast[1]){
		$(".edit-availability .calendar tbody th").slice(firstLast[1], $(".edit-availability .calendar tbody th").length).addClass("muted");
	}
}

$(".edit-availability .calendar #month-back").click(function(){
	if(currentMonth-1 < 0){
		currentMonth = 11;
		currentYear--;
	}else{
		currentMonth--;
	}
	showCalendar(currentYear, currentMonth);
	addNewEventListeners();
	
});

$(".edit-availability .calendar #month-next").click(function(){
	console.log(currentMonth);
	if(currentMonth+1 > 11){
		currentMonth = 0;
		currentYear++;
	}else{
		currentMonth++;
	}
	console.log(currentMonth);
	showCalendar(currentYear, currentMonth);
	addNewEventListeners();
	
});

function disableAfterandOn(){
	$('#occurences').prop('disabled', true);
	$('#on').prop('disabled', true);
}

function removeDisabledAfter(){
	$('#occurences').prop('disabled', false);
	$('#on').prop('disabled', true);
}

function removeDisabledOn(){
	$('#on').prop('disabled', false);
	$('#occurences').prop('disabled', true);
}

function showRepeatForm(){
	$('.add-new-form').removeClass('show');
	$('.edit-availability').removeClass('hide');
}

function toggleChecked(label){
	console.log(label);
	label.classList.toggle("dayChecked");
}

function showRepeat(){
	$('.add-new-form .repeat').addClass('show');
}

function hideRepeat(){
	$('.add-new-form .repeat').removeClass('show');
}

function addNewEventListeners(){
	$('.edit-availability .calendar tbody th:not(.muted)').on('mouseenter', function(){
		$(this).append(`<button onclick='showAddNewForm(this);' class='btn btn-primary add-new'><span>Add New...</span></button>`);
	})

	$('.edit-availability .calendar tbody th:not(.muted)').on('mouseleave', function(){
		$(this).find('.add-new').remove();
	})
}

function showAddNewForm(button){
	// button.parentNode.style.boxShadow = '0 10px rgb(200,200,200) inset';
	var thID = button.parentNode.id;

	thArr.forEach(function(th){
		if(thID == th.thID){
			$('.date').val(th.day + ' ' + th.month + ', ' + th.year);
			$('.add-new-form').addClass('show');
			$('.edit-availability').removeClass('show');

		}
	});
}

function closeAddNewForm(){
	$('.add-new-form').removeClass('show');
	$('.edit-availability').addClass('show');
}