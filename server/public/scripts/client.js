console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    // let koalaToSend = {
    //   name: $('#nameIn').val(),
    //   gender: $('#ageIn').val(),
    //   age: $('#genderIn').val(),
    //   readyForTransfer: $('#readyForTransferIn').val(),
    //   notes: $('#notesIn').val()
    // };
    // call saveKoala with the new obejct
    saveKoala();
    //saveKoala( koalaToSend );
  }); 
}

// GET
function getKoalas(){
  $.ajax({
    type: "GET",
    url: "/koala"
  }).then (function(response){
    let listOfKoala = response;
    renderKoala(listOfKoala);
    console.log('Response');
  }).catch(function (error){
    console.log('Error in sending', error);
  });
} // end getKoalas

// POST
function saveKoala() {
  // ajax call to server to POST koalas
  console.log( 'in getKoalas' );
  const newKoala = {
    name: $('#nameIn').val(),
    gender: $('#ageIn').val(),
    age: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  };
  console.log('What is newKoala doing?', newKoala);
  $.ajax({
    method: 'POST',
    url: '/koala',
    data: newKoala
  }).then(function(response) {
    console.log(response);
    getKoalas();
  }).catch(function(error) {
    console.log('error in koala post', error); 
    alert('Error adding koala. Please try again later.')       
  });
  
  // clear inputs after koala is added
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');

  console.log( 'in saveKoala');
 }

// PUT

function transferKoala(koalaId){
  console.log('Koala is ready for transfer');
  $.ajax({
    method: 'PUT',
    url: `/koala/${koalaId}`, //correct url?
    //data: {} // Does any data need to be transferred here?
  })
  .then(response => {
    console.log(`Koala status updated`, response);
    //*************UPDATE KOALA TABLE FUNCTION HERE***********//
  })
  .catch(error => {
    console.log(`Koala status NOT updated`, error);
  });
}


//render to DOM, include delete button for each append.
function renderKoala(listOfKoala){
  $('#viewKoalas').empty();
  for(let koala of listOfKoala) {
    $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.readyForTransfer}</td>
          <td>${koala.notes}</td>
          <td><button id="deleteKoala">Delete</button></td>
        </tr>`
        );
  }
};


// DELETE
function deleteKoala(){
    $.ajax({
    method: 'delete',
    url: `/koala/${koalaId}`, //correct url?
  })
  .then(response => {
    console.log(`Koala status updated`, response);
    getKoalas();
  })
  .catch(error => {
    console.log(`Koala status NOT updated`, error);
  });
};