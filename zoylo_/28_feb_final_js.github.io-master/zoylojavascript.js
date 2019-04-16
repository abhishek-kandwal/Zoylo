// all the variable declared here
// var hospital_name = 'khetarpal Nursing Home - Rajouri Garden'
// var hospital_location = '#Gn-5, FNG SectorNew Delhi, Delhi'
// var hospital_detail = 'khetarpal Nursing Home - Rajouri Garden'
var value_incre = 0;
var doctor_id_start_m;
var doctor_id_end_m;
var doctor_id_interval;
var doctor_id_start_a;
var doctor_id_end_a;
var doctor_id_start_e;
var doctor_id_end_e;
var doctor_id_start_n;
var doctor_id_end_n;

// right booking section here
/** store data in local storage part starts here */

function option_tab(){
  let button_value = document.getElementById('option_tab_bar');
  if(value_incre==0){
  button_value.style.display='block';
  value_incre = 1;
  }else{
    button_value.style.display='none';
    value_incre = 0;
  }
}


function settime (value) {
  console.log(value)
}

function store_data () {
  var booking_data_date = document.getElementById('input_box_date').value
  var booking_data_time = document.getElementById('input_box_time').value
  console.log(booking_data)
  localStorage.setItem('booking', booking_data)
  if (localStorage.getItem('booking') != null) {
    document.getElementById('confirm_btn_dis').disabled = true
    console.log('yes!');
  }
}

/** store data in local storage part ends here  */

/** show hide code here */
function show_hide (value) {
  if (value == 0) {
    document.getElementById('ameties_div').style.display = 'none'
    document.getElementById('time_slot').style.display = 'block'
  } else if (value == 1) {
    document.getElementById('time_slot').style.display = 'none'
    document.getElementById('ameties_div').style.display = 'block'
  }
}

/** show hide code ends here */

/** morning afternoon function */

/** moring afernoon function ends */

/** creative div */
function timing(time_ids,start_time,end_time,interval_set) {
  var time_btn_id = document.getElementById("div_time_btn");
  var s_time = start_time;
  var e_time =end_time;
  var interval=interval_set;
  var stime=s_time.split(':')[0];
  var etime=e_time.split(':')[0];
  var time_diff=(parseInt(etime)-parseInt(stime))*60;
  var loop=time_diff/interval;
  var min = 0;
  var hour = parseInt(stime);
  for (var index = 0; index < loop; index++) {
      var time_btn = document.createElement("button");
      time_btn.setAttribute('class', 'time_slot_btns');
      time_btn.id = time_ids+ index;
      time_btn.setAttribute("onclick", "time_store(this.id,this.id)");
      if (min < 60 && min != 0 && hour<24) {
          var but_text = document.createTextNode(hour + ":" + min);
          var val = hour + ":" + min;
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }
      else if (min == 0 && hour<24) {
          var but_text = document.createTextNode(hour + ":" + min + '0');
          var val = hour + ":" + min + '0';
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }
      else if (min == 60 && hour<24) {
          min = min % 60;
          hour = hour + 1;
          var but_text = document.createTextNode(hour + ":" + min + '0');
          var val = hour + ":" + min + '0';
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }

      else if (min < 60 && min != 0 && hour>=24) {
          hour=hour%24;
          var but_text = document.createTextNode(hour + ":" + min);
          var val = hour + ":" + min;
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }
      else if (min == 0 && hour<24) {
        hour=hour%24;
          var but_text = document.createTextNode(hour + ":" + min + '0');
          var val = hour + ":" + min + '0';
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }
      else if (min == 60 && hour<24) {
        hour=hour%24;
          min = min % 60;
          hour = hour + 1;
          var but_text = document.createTextNode(hour + ":" + min + '0');
          var val = hour + ":" + min + '0';
          time_btn.value = but_text;
          time_btn.appendChild(but_text);
      }
      min = min + 30;
      time_btn.value = val;
      time_btn_id.appendChild(time_btn);
  }
}
function morning_btn() {
  const parent = document.getElementById("div_time_btn");
  while (parent.firstChild) {
      parent.firstChild.remove();
  }
  timing("time_m", doctor_id_start_m,doctor_id_end_m,doctor_id_interval);
}
function after_btn() {
  const parent = document.getElementById("div_time_btn");
  while (parent.firstChild) {
      parent.firstChild.remove();
  }
  timing("time_a", doctor_id_start_a,doctor_id_end_a,doctor_id_interval);
}
function evening_btn() {
  const parent = document.getElementById("div_time_btn");
  while (parent.firstChild) {
      parent.firstChild.remove();
  }
  timing("time_e", doctor_id_start_e,doctor_id_end_e,doctor_id_interval);
}
function night_btn() {
  const parent = document.getElementById("div_time_btn");
  while (parent.firstChild) {
      parent.firstChild.remove();
  }
  timing("time_n", doctor_id_start_n,doctor_id_end_n,doctor_id_interval);
}

/**onclick function for the time slot booking buttons starts here */
function time_store(id,time_key){
var d=new Date();
var current_time=d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
curr_time=current_time.split(':');
var book_time=(document.getElementById(id).value).split(":");
if(parseInt(curr_time[0])<parseInt(book_time[0])){
  if(localStorage.getItem(time_key)==null){
    localStorage.setItem(time_key, document.getElementById(id).value);
    alert("This time slot is allocated to you");
    document.getElementById(id).style.cursor="not-allowed";
  }
  else{
    alert("this time slot is already booked");
    document.getElementById(id).disabled=true;
    document.getElementById(id).style.cursor="not-allowed";
  }
}
else if(parseInt(curr_time[0])>parseInt(book_time[0])){
  document.getElementById(id).disabled=true;
  document.getElementById(id).style.cursor="not-allowed";
  alert("Out of time");
}
else if(parseInt(curr_time[0])===parseInt(book_time[0])){
  if((parseInt(curr_time[1])<parseInt(book_time[1])) && localStorage.getItem(time_key)==null){
    localStorage.setItem(time_key, document.getElementById(id).value);
  }
  else{
    document.getElementById(id).disabled=true;
    document.getElementById(id).style.cursor="not-allowed";
    alert("Out of time");
  }
}
    
}
/** onclick for time slot buttons ends here */

/**
 *  map code here
 */
var map, infoWindow
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 28.508742, lng: 77.0910833 },
    zoom: 14
  })
  infoWindow = new google.maps.InfoWindow()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = [{
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }]
      // pos.push({ 'lat': 28.466062, 'lng': 77.028633 })
      // add other locations of doctors
      var locations = [
        ['Your location', 28.508742, 77.0910833, 4],
        ['Docter 1', 28.5039313, 77.0952976, 5],
        ['Docter 2', 28.5021965, 77.0901048, 3],
        ['Docter 3', 28.5063827, 77.0903194, 2],
        ['Docter 4', 28.5037161, 77.0712033, 1]
      ]
      var map1 = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(28.508742, 77.0910833),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })
      var infowindow1 = new google.maps.InfoWindow()
      var marker
      for (let locate = 0; locate < data.doctorListing.length; locate++) {
        if (locate == 0) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[locate][1], locations[locate][2]),
            animation: google.maps.Animation.DROP,
            map: map1
          })
          infowindow1.setContent(locations[locate][0])
          infowindow1.open(map1, marker)
        }
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.doctorListing[locate].address[0].gpsCoordinates.gpsLatitude, data.doctorListing[locate].address[0].gpsCoordinates.gpsLongitude),
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          map: map1
        })
        google.maps.event.addListener(marker, 'click', (function (marker, locate) {
          return function () {
            console.log(locate)
            // add event on location click to the marker
            var element = document.getElementById(locate)
            element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
            document.getElementById('bookBtn' + locate).style.display = 'block'
            infowindow1.setContent(data.doctorListing[locate].docName)
            infowindow1.open(map1, marker)          }
        })(marker, locate))
      }
      var distances = []
      for (let index = 0; index < data.doctorListing.length; index++) {
        let loc1 = new google.maps.LatLng(28.508742, 77.0910833)
        let loc2 = new google.maps.LatLng(data.doctorListing[index].address[0].gpsCoordinates.gpsLatitude, data.doctorListing[index].address[0].gpsCoordinates.gpsLongitude)
        let distan = ((google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2)) / 1000).toFixed(2)
        distances.push(distan)
      }

      for (let index = 0; index < data.doctorListing.length; index++) {
        let pLocation = document.getElementById('loc' + index)
        pLocation.innerHTML = distances[index] + 'km'
      }
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter())
    })
  } else {
    // handleLocationError(false, infoWindow, map.getCenter());
    alert('location is not working')
  }
}
/**
 * map code ends here
 */
/**
 *  list code here card
 */

function zoyloContent(data) {
  var dataLength = data.doctorListing.length
  /* Card Section */
  // Fetching element id of card section
  let cardArea = document.getElementById('left_side_content')
  // Scrollbar div
  let divScrollbar = document.createElement('div')
  divScrollbar.setAttribute('class', 'scrollbar') // Will be attached to content page
  cardArea.appendChild(divScrollbar)
  // Inside Scrollbar
  let ulList = document.createElement('ul')
  ulList.setAttribute('class', 'search-list')
  divScrollbar.appendChild(ulList) // ul list attached to Scrollbar div
  // Creating li list in ul list
  // Content below will rendered using for loop
  for (let index = 0; index < dataLength; index++) {
    let liInulList = document.createElement('li')
    liInulList.setAttribute('class', 'active')
    liInulList.setAttribute('id', index)
    liInulList.style.marginBottom = '10px'
    ulList.appendChild(liInulList) // Attaching li list to ul list
    // Creating row div inside li list
    let rowDivInLi = document.createElement('div')
    rowDivInLi.setAttribute('class', 'row')
    liInulList.appendChild(rowDivInLi) // row attached to li
    // Creating column 1 in row div  of li list
    let col1InRowDiv = document.createElement('div')
    col1InRowDiv.setAttribute('class', 'col-sm-3 col-lg-2 col-xl-2')
    rowDivInLi.appendChild(col1InRowDiv) // Attached col1 in row
    // creating anchor tag in col1
    let anchorInCol1 = document.createElement('a')
    anchorInCol1.setAttribute('href', '#')
    col1InRowDiv.appendChild(anchorInCol1) // Attached anchor tag to col1
    // Creating div inside anchor
    let docImageDiv = document.createElement('div')
    docImageDiv.setAttribute('class', 'doc-image rounded-circle d-flex justify-content-center')
    anchorInCol1.appendChild(docImageDiv) // Attached docImageDiv to anchor tag
    /* Using if loop to create img tag inside docImageDiv
    and appending the image by using condition to match
    male or female */
    if (data.doctorListing[index].gender === 'male') {
      var imgInDocImageDiv = document.createElement('img') // Creating image tag in docImageDiv
      imgInDocImageDiv.setAttribute('src', 'male_img.png')
      imgInDocImageDiv.setAttribute('class', 'img-fluid')
      docImageDiv.appendChild(imgInDocImageDiv)
    } else {
      imgInDocImageDiv = document.createElement('img')
      imgInDocImageDiv.setAttribute('src', 'female_img.png')
      imgInDocImageDiv.setAttribute('class', 'img-fluid')
      docImageDiv.appendChild(imgInDocImageDiv)
    }
    // Column 1 Ended
    // Creatin column 2 in row div of li list
    let col2InRowDiv = document.createElement('div')
    col2InRowDiv.setAttribute('class', 'col-sm9 col-lg-6 col-xl-5 cardBorder')
    rowDivInLi.appendChild(col2InRowDiv) // Attaching column2 with row div created in li list
    // Creating a div in column2 created above
    let docDetailsDiv = document.createElement('div')
    docDetailsDiv.setAttribute('class', 'doc-details')
    col2InRowDiv.appendChild(docDetailsDiv) // Attaching docDetails Div to column2
    // Creating h5 tag in doc details div
    let drName = document.createElement('h5')
    drName.setAttribute('class', 'm-0 h51')
    drName.setAttribute('id', 'drname' + index)
    drName.innerHTML = data.doctorListing[index].docName // Pushing name by fetching element id
    docDetailsDiv.appendChild(drName) // Attaching drName h5 tag to docDetails Div
    // Creating anchor tag to be attached to h5 tag created above
    let doctorNameLink = document.createElement('a')
    doctorNameLink.setAttribute('href', '#')
    doctorNameLink.setAttribute('class', 'font-14')
    drName.appendChild(doctorNameLink) // Attaching doctor link anchor tag to h5 tag created above
    // creating p tag in doc details div
    let designation = document.createElement('p')
    designation.setAttribute('class', 'grey-text txt-uppercase')
    designation.setAttribute('id', 'desig' + index)
    designation.innerHTML = data.doctorListing[index].qualification
    docDetailsDiv.appendChild(designation) // Attached Designation to doc details div
    // Creating ul list in doc details div for rating
    let ratingList = document.createElement('ul')
    ratingList.setAttribute('class', 'ul_item')
    ratingList.setAttribute('class', 'rating mr-3')
    docDetailsDiv.appendChild(ratingList) // Attaching rating list into doc details
    // using while loop to render rating based on json data
    let rateOfDocs = data.doctorListing[index].rating
    let loopCount = 5
    if (rateOfDocs <= 5) {
      while (loopCount !== 0) {
        if (rateOfDocs > 0) {
          // Creating li list in rating list
          let liRatingList = document.createElement('li')
          ratingList.appendChild(liRatingList) // Attaching rating list li to ul list
          // Creating span tag for rates to be placed in li list
          let spanStar = document.createElement('span')
          spanStar.setAttribute('class', 'fa fa-star checked')
          liRatingList.appendChild(spanStar) // Attaching stars to li list
        } else {
          // Creating li list in rating list
          let liRatingList = document.createElement('li')
          ratingList.appendChild(liRatingList) // Attaching rating list li to ul list
          // Creating span tag for rates to be placed in li list
          let spanStar = document.createElement('span')
          spanStar.setAttribute('class', 'fa fa-star')
          liRatingList.appendChild(spanStar) // Attaching stars to li list
        }
        rateOfDocs--
        loopCount--
      }
    }
    // Creating p tag in doc details div
    let specialization = document.createElement('p')
    specialization.setAttribute('title', data.doctorListing[index].specialization)
    specialization.innerHTML = data.doctorListing[index].specialization
    docDetailsDiv.appendChild(specialization) // Attaching specialization to doc details div
    /* Column 2 ended */
    /* Column 3 section start */
    // Creating cloumn3 in row div of li list
    let col3InRowDiv = document.createElement('div')
    col3InRowDiv.setAttribute('class', 'col-lg-4 col-xl-5')
    rowDivInLi.appendChild(col3InRowDiv) // Attaching column3 with row div
    // Creating div doc clinic details in col 3
    let docCleanicDetails = document.createElement('div')
    docCleanicDetails.setAttribute('class', 'doc-clinic-details pl-md-4 d-flex justify-content-around flex-column h-100')
    col3InRowDiv.appendChild(docCleanicDetails) // Attaching doc clinic details div into col 3
    // Creating anchor tag into doc clinic details div
    let docClinicLink = document.createElement('a')
    docClinicLink.setAttribute('class', 'font14 font-medium')
    docClinicLink.innerHTML = data.doctorListing[index].address[0].addressLineOne
    docCleanicDetails.appendChild(docClinicLink) // Attaching doc clinic link to doc clinic details div
    // Calculating Distances and appending
    // finding distance of lt and lo
    // Creating p tag in doc clinic details div
    let pLocation = document.createElement('p')
    pLocation.setAttribute('class', 'grey-text font12 glyphicon glyphicon-map-marker')
    docCleanicDetails.appendChild(pLocation) // Attaching p tag to doc clinic details div
    // Creating span tag for location icon in p tag created above
    let spanLocation = document.createElement('span')
    spanLocation.setAttribute('id', 'loc' + index)
    spanLocation.setAttribute('class', 'loc')
    pLocation.appendChild(spanLocation) // Attaching span location to pLocation
    // creating h5 tag for price
    let h5Price = document.createElement('h5')
    h5Price.setAttribute('class', 'm-1')
    h5Price.innerHTML = data.doctorListing[index].cost
    docCleanicDetails.appendChild(h5Price) // Attaching price to doc clinic details div
    // Creating button tag for BooK
    let btnBook = document.createElement('button')
    btnBook.setAttribute('id', 'bookBtn' + index)
    btnBook.setAttribute('type', 'button')
    btnBook.setAttribute('class', 'btn book-appointment btn-primary')
    btnBook.setAttribute('onclick', 'book_window()') // Adding EventListener to Book Button
    btnBook.innerHTML = 'Book'
    rowDivInLi.appendChild(btnBook) // Attaching book button to row div in li list

    let bookButtonEvent=[]
    bookButtonEvent[index]=document.getElementById('bookBtn'+index)
    let docIndex=document.getElementById('drname'+index).innerText
    bookButtonEvent[index].addEventListener('click',function(){
      console.log(docIndex)
      bookApointment(docIndex)
    },false)
  
  }
}


/**
 *  list card code ends here
 */
// bookApointment Function Implementation
function bookApointment(input)
{

  for(let i=0; i<data.doctorListing.length; i++)
  {
    if(data.doctorListing[i].docName === input){
      document.getElementById('hospital_name').innerHTML=data.doctorListing[i].address[0].addressLineOne
    document.getElementById('hospital_location').innerHTML=data.doctorListing[i].address[0].addressLineTwo
    document.getElementById('hospital_detail').innerHTML=data.doctorListing[i].address[0].addressLineOne
    
    // interval
    doctor_id_interval=data.doctorListing[i].slots.slotInterval;
    // extracting time slots from json 
    doctor_id_start_m=data.doctorListing[i].slots.morning[0].startTime;
    doctor_id_end_m=data.doctorListing[i].slots.morning[0].endTime;
    doctor_id_start_a=data.doctorListing[i].slots.afternoon[0].startTime;
    doctor_id_end_a=data.doctorListing[i].slots.afternoon[0].endTime;
    doctor_id_start_e=data.doctorListing[i].slots.evening[0].startTime;
    doctor_id_end_e=data.doctorListing[i].slots.evening[0].endTime;
    doctor_id_start_n=data.doctorListing[i].slots.night[0].startTime;
    doctor_id_end_n=data.doctorListing[i].slots.night[0].endTime;

    }
    
  }
}

function book_window () {
  document.getElementById('zoylo_right_section_content_1').style.display = 'none'
  document.getElementById('zoylo_right_section_content_2').style.display = 'block'
}

function cancel_button () {
  document.getElementById('zoylo_right_section_content_1').style.display = 'block'
  document.getElementById('zoylo_right_section_content_2').style.display = 'none'
}
