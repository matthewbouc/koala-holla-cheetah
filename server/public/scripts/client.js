console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $('#viewKoalas').on('click', '.deleteKoala', deleteKoalaHandler);
  $('#viewKoalas').on('click', '.transferKoalaButton', transferKoalaHandler);
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
    // call saveKoala with the new object
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
    gender: $('#genderIn').val(),
    age: $('#ageIn').val(),
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
    getKoalas();
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
          <td><button class="transferKoalaButton" data-id=${koala.id}>Transfer</button></td>
          <td><button class="deleteKoala" data-id=${koala.id}>Delete</button></td>
        </tr>`
        );
  }
};


// DELETE
function deleteKoalaHandler() {
  deleteKoala($(this).data('id'));
} 

//TRANSFER
function transferKoalaHandler(){
  transferKoala($(this).data('id'));
}

function deleteKoala(koalaId){
    $.ajax({
    method: 'DELETE',
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
