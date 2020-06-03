function checkForm(form, updatingForm){
	var selectors, company, position, city, returnVal;

	if(updatingForm){
		selectors = document.querySelectorAll('.select-update');
		company = document.getElementById('company-update');
		position = document.getElementById('position-update');
		city = document.getElementById('city-update');
	}else{
		selectors = document.querySelectorAll('select');
		company = document.getElementById('company');
		position = document.getElementById('position');
		city = document.getElementById('city');
	}
	returnVal = true;

	console.log(selectors)
	

	removePreviousClassList(company, position, city, selectors[0]);

	if(company.value === ''){
		company.classList.add('is-invalid');
		returnVal = false;
	}else{
		company.classList.add('is-valid');
	}

	if(city.value === ''){
		city.classList.add('is-invalid');
		returnVal = false;
	}else{
		city.classList.add('is-valid');
	}

	if(position.value === ''){
		position.classList.add('is-invalid');
		returnVal = false;
	}else{
		position.classList.add('is-valid');
	}

	if (selectors[0].style.display !== 'none'){
		if(parseInt(selectors[0].value) > parseInt(selectors[1].value)){
			selectors[0].classList.add('is-invalid');
			returnVal = false;
		}else{
			selectors[0].classList.add('is-valid');
		}
	}

	if(returnVal===true){
		form.submit();
	}

	//forUpdate
	$('.worplace').removeClass('hide');

	return returnVal;
}

function removePreviousClassList(company, position, city, selector){
	company.classList.remove('is-valid');
	company.classList.remove('is-invalid');
	position.classList.remove('is-valid');
	position.classList.remove('is-invalid');
	city.classList.remove('is-valid');
	city.classList.remove('is-invalid');
	selector.classList.remove('is-valid');
	selector.classList.remove('is-invalid');
}

function showAddWorkForm(){
	$('#add-work-place').addClass('hide');
	$('#new-work').addClass('show');
}

function hideAddWorkForm(){
	$('#add-work-place').removeClass('hide');
	$('#new-work').removeClass('show');
}

function addYearsToDropDown(dropDown){
	years.forEach(function(year){
		dropDown.innerHTML += "<option>" + year + "</option>"
	});
}

function toggleFromTo(checkbox){

	if(checkbox.checked){
		document.querySelector('select').style.display = 'none';
		document.querySelectorAll('label')[1].innerHTML = 'from';
	}else{
		document.querySelector('select').style.display = 'block';
		document.querySelectorAll('label')[1].innerHTML = 'to';
	}

	document.querySelector('select').classList.remove('is-valid');
	document.querySelector('select').classList.remove('is-invalid');
}

function buildYears(){
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var output = [];

	for(var i = currentYear; i > 1800; i--){
		output.push(i);
	}

	return output;
}