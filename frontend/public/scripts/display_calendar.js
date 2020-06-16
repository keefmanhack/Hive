var Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let displayCalendar = new Calendar('display');
displayCalendar.initializeCalendar();
let availabilityCalendar = new Calendar('availability');
availabilityCalendar.initializeCalendar();
$('#on').datepicker();

addNewEventListeners();



function Calendar(classModifier){
	this.currentMonth = undefined;
	this.currentYear = undefined;
	this.classData = undefined;
	this.thArr = [];

	this.showCalendar =function(year, month){
		this.clearCalendar();
		this.thArr.splice(0, this.thArr.length);

		//DATE INFORMATION
		var date = new Date(year, month, 1);
		var daysInThisMonth = this.numOfDaysInMonth(date.getFullYear(), date.getMonth());
		var previousMonthDays = date.getDay();
		var nextMonthDays = 6 - (new Date(date.getFullYear(), date.getMonth(), daysInThisMonth)).getDay();
		var totalDaysToShow = nextMonthDays + previousMonthDays + daysInThisMonth;
		var lastDayOfPreviousMonth;

		if(date.getMonth()-1 <0){
			lastDayOfPreviousMonth = this.numOfDaysInMonth(date.getFullYear(), 11);
		}else{
			lastDayOfPreviousMonth = this.numOfDaysInMonth(date.getFullYear(), date.getMonth()-1);
		}
		//END OF DATE INFORMATION
		
		var cols = 7;
		var rows = Math.floor(totalDaysToShow/7);
		var ct =1;
		var text = "";

		$("."+ classModifier +".calendar h1")[0].textContent = Months[date.getMonth()];
		$("."+ classModifier +".calendar h2")[0].textContent = date.getFullYear();

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
				this.thArr.push({
					thID : thCt,
					day: rowText[k],
					month: Months[date.getMonth()],
					year: date.getFullYear()
				});
				thCt++;
			}

			text += `</tr>`;
	  		$("."+ classModifier +".calendar tbody").append(text);
		}


		this.NotInMonth(); //grey out unused dates
	}

	this.initializeCalendar = function(){
		var date = new Date();
		currentMonth = date.getMonth();
		currentYear = date.getFullYear();
		this.showCalendar(currentYear, currentMonth);
	}

	this.numOfDaysInMonth = function(year, month){
		for(var i =1; i<33; i++){
			var date = new Date(year, month, i);

			if (date.getMonth() !== month){
				return i-1;
			}
		}
	}

	this.clearCalendar = function(){
		$("."+ classModifier +".calendar tbody").empty();
	}

	this.NotInMonth = function(){
		var firstLast = [];
		for(var i =0; i<$("."+ classModifier +".calendar tbody th").length; i++){
			if($("."+ classModifier +".calendar tbody th span")[i].textContent == 1){
				firstLast.push(i);
			}
		}

		if(firstLast[0] >0){
			$("."+ classModifier +".calendar tbody th").slice(0, firstLast[0]).addClass("muted");
		}
		if(firstLast[1]){
			$("."+ classModifier +".calendar tbody th").slice(firstLast[1], $(".calendar tbody th").length).addClass("muted");
		}
	}

	this.decrementDis = function(){
		if(currentMonth-1 < 0){
			currentMonth = 11;
			currentYear--;
		}else{
			currentMonth--;
		}
		this.showCalendar(currentYear, currentMonth);
	
	};

	this.incrementDis = function(){
		if(currentMonth+1 > 11){
			currentMonth = 0;
			currentYear++;
		}else{
			currentMonth++;
		}
		this.showCalendar(currentYear, currentMonth);
	};

	this.decrementAv = function(){
		if(currentMonth-1 < 0){
			currentMonth = 11;
			currentYear--;
		}else{
			currentMonth--;
		}
		this.showCalendar(currentYear, currentMonth);
		addNewEventListeners();
	
	};

	this.incrementAv = function(){
		if(currentMonth+1 > 11){
			currentMonth = 0;
			currentYear++;
		}else{
			currentMonth++;
		}
		this.showCalendar(currentYear, currentMonth);
		addNewEventListeners();
	};
}

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
	var thID = button.parentNode.id;

	availabilityCalendar.thArr.forEach(function(th){
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

