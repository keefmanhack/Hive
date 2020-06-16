function editWork(userID, workID){
	var requestUrl = '/user/' + userID + '/work/' + workID;

	//hide form
	$('.workplace#' + workID).addClass('hide');
	$('#add-work-place').addClass('hide');



	$.get(requestUrl).done(function(data){
   		createUpdateWorkForm(data, workID);
		});
}

function createUpdateWorkForm(workData, workID){
	var currentlyWorking = false;

	if (workData && workData.currentlyWorking && workData.currentlyWorking===true){
		currentlyWorking = true;
	}



	$('.update-work.' + workID).append(`
		<img id='selected-company-update' class="selected-company" src="`+ workData.companyLogo +`">
		<input type="hidden" id="selected-company-hidden-input-update" name="companyLogo">
		<div class="row form-group">
			<div class="col autocomplete">
				<input oninput="requestLogos(this);" id="company-update" type="text" class="form-control" value="`+ workData.company +`" name="company" placeholder="Company" required>
				<div class="invalid-feedback">
						<i class="fas fa-exclamation-circle"></i>
				</div>
				<div class="valid-feedback">
				 	<i class="fas fa-check"></i>
				</div>
			</div>
			<div class="col autocomplete">
				<input type="text" oninput="requestPositions(this)" id="position-update" class="form-control" value="`+ workData.position +`" name="position" placeholder="Position" required>
				<div class="invalid-feedback">
						<i class="fas fa-exclamation-circle"></i>
				</div>
				<div class="valid-feedback">
				 	<i class="fas fa-check"></i>
				</div>
			</div>
		</div>
		<div class="row form-group">
			<div class="col">
				<input type="text" oninput="requestCities(this)" id="city-update" class="form-control" name="city" value="`+ workData.city +`" placeholder="City/Town" required>
				<div class="invalid-feedback">
						<i class="fas fa-exclamation-circle"></i>
				</div>
				<div class="valid-feedback">
				 	<i class="fas fa-check"></i>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<textarea class="form-control" name="description" placeholder="Description">`+workData.description+`</textarea>
			</div>
		</div>
		<div class="row form-group">
			<div class="col">
				<h2>Time Period</h2>
			</div>
		</div>
		<div class="row form-group">
			<div class="col form-check">
				<input class="form-check-input" onchange="toggleFromToUpdated(this)" type="checkbox" name="currentlyWorking" value="`+ currentlyWorking +`" id="defaultCheck1">
					<label class="form-check-label" style="color: white;" for="defaultCheck1">I currently work here</label>
			</div>
		</div>
		<div class="row form-group timeFrame">
			<div class="col-lg-2">
				<select class="form-control select-update" id="from-update" name="from"><option selected>`+workData.from+`</option></select>
				<div class="valid-feedback">
					Looks good!
					</div>
					<div class="invalid-feedback">
					Start date can't be before end date
					</div>
			</div>
			<div class="col-lg-1">
				<label class='label-update' style="color: white;">to</label>
			</div>
			<div class="col-lg-2">
				<select class="form-control select-update" id="to-update" name="to"><option selected>`+workData.to+`</option></select>
			</div>
			<div class="col-lg-7">
				
			</div>
		</div>
		<hr>
		<button onclick="removeUpdateWorkForm();" type="button" class="btn btn-primary cancel">Cancel</button>
		<button class="btn btn-primary save">Save</button>`);

	document.getElementById('selected-company-hidden-input-update').value = workData.companyLogo;
	
	$('.update-work.' + workID).addClass('show');

	initializeAutoFillEvenListeners(document.getElementById('company-update'));
	initializeAutoFillEvenListeners(document.getElementById('position-update'));
	initializeAutoFillEvenListeners(document.getElementById('city-update'));

	addYearsToDropDown(document.getElementById('from-update'), workData.from);
	addYearsToDropDown(document.getElementById('to-update'), workData.to);

}

function addYearsToDropDown(dropDown, omitYear){
	years.forEach(function(year){
		if (year == omitYear){

		}else{
			dropDown.innerHTML += "<option>" + year + "</option>"	
		}
	});
}

function removeUpdateWorkForm(){
	$('#add-work-place').removeClass('hide');
	$('.workplace').removeClass('hide');
	$('.update-work').empty();
	$('.update-work').removeClass('show');
}

function showEditDelete(icon){
	var parentDiv =	icon.nextSibling.nextSibling;
	parentDiv.classList.add('show');

	$(document).mouseup(function(e){
		var container = $(".edit-delete").parent();

	    // If the target of the click isn't the container
	    if(!container.is(e.target) && container.has(e.target).length === 0){
	        container.children('.edit-delete').removeClass('show');
	    }
	});
}

function toggleFromToUpdated(checkbox){
	if(checkbox.checked){
		document.getElementById('from-update').style.display = 'none';
		document.querySelectorAll('.label-update')[0].innerHTML = 'from';
	}else{
		document.getElementById('from-update').style.display = 'block';
		document.querySelectorAll('.label-update')[0].innerHTML = 'to';
	}

	document.getElementById('from-update').classList.remove('is-valid');
	document.getElementById('from-update').classList.remove('is-invalid');
}