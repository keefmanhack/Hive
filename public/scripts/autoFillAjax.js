function requestLogos(input){
  var requestUrl = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + input.value;

   $.get(requestUrl).done(function(data){
   		createCompanyDropDown(input, data);
		});
}

function requestPositions(input){
	var requestUrl = 'http://api.dataatwork.org/v1/jobs/autocomplete?begins_with="' + input.value + '"';


   $.get(requestUrl).done(function(data){
   		createPositionDropDown(input, data);
		});
}

function requestCities(input){
	var options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
	};
 var autocomplete = new google.maps.places.Autocomplete(input, options);
}

function createCityDropDown(input, arr){
  var a, b, i, val = input.value;
  currentFocus=-1;
  /*close any already open lists of autocompleted values*/
  closeAllLists(input);
  if (!val) { return false;}
  currentFocus = -1;

  a = document.createElement("DIV");
  a.setAttribute("id", input.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");

  input.parentNode.appendChild(a);
  /*for each item in the array...*/
  for (i = 0; i < arr.length; i++) {
    /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
    /*make the matching letters bold:*/
    b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
    b.innerHTML += arr[i].name.substr(val.length) + ', ' + arr[i].adminName1;
    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' value='" + arr[i].name + ', ' + arr[i].adminName1 + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        input.value = this.childNodes[2].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists(input);
    });
    a.appendChild(b);
  }
}

function createPositionDropDown(input, arr){
  var a, b, i, val = input.value;
  currentFocus=-1;
  /*close any already open lists of autocompleted values*/
  closeAllLists(input);
  if (!val) { return false;}
  currentFocus = -1;

  a = document.createElement("DIV");
  a.setAttribute("id", input.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");

  input.parentNode.appendChild(a);
  /*for each item in the array...*/
  for (i = 0; i < arr.length; i++) {
    /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
    /*make the matching letters bold:*/
    arr[i].normalized_job_title = capitalizeFirstLetter(arr[i].normalized_job_title);
    b.innerHTML = "<strong>" + arr[i].normalized_job_title.substr(0, val.length) + "</strong>";
    b.innerHTML += arr[i].normalized_job_title.substr(val.length);
    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' value='" + arr[i].normalized_job_title + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        input.value = this.childNodes[2].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists(input);
    });
    a.appendChild(b);
  }
}

function capitalizeFirstLetter(str){
  var returnStr = '';
  str.split(" ").forEach(function(o){
    returnStr += o.substring(0,1).toUpperCase() + o.substring(1, o.length) + ' ';
  });

  return returnStr.trim();
}

function createCompanyDropDown(input, arr){
  var a, b, i, val = input.value;
  currentFocus=-1;
  /*close any already open lists of autocompleted values*/
  closeAllLists(input);
  if (!val) { return false;}
  currentFocus = -1;

  a = document.createElement("DIV");
  a.setAttribute("id", input.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");

  input.parentNode.appendChild(a);
  /*for each item in the array...*/
  for (i = 0; i < arr.length; i++) {
    /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      b.innerHTML = "<img src=" + arr[i].logo + " onError=this.src='/photos/blankPhoto.png'>"
    /*make the matching letters bold:*/
    b.innerHTML += "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
    b.innerHTML += arr[i].name.substr(val.length);
    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        input.value = this.childNodes[3].value;

        document.getElementById('selected-company').src = this.childNodes[0].src;
        if(document.getElementById('selected-company-update') && document.getElementById('selected-company-update').src){
          document.getElementById('selected-company-update').src = this.childNodes[0].src;  
        }

        document.getElementById('selected-company-hidden-input').value = this.childNodes[0].src;
        if(document.getElementById('selected-company-hidden-input-update')){
          document.getElementById('selected-company-hidden-input-update').value = this.childNodes[0].src; 
        }

        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists(input);
    });
    a.appendChild(b);
  }
}

function initializeAutoFillEvenListeners(inp){
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
}

function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt, inp) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
    }
  }
}


document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});