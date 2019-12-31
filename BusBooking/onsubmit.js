
// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyDym32S-xEsC4no1uCnksbmSCy0zKTbdfE",
  authDomain: "busroute-b96df.firebaseapp.com",
  databaseURL: "https://busroute-b96df.firebaseio.com",
  projectId: "busroute-b96df",
  storageBucket: "busroute-b96df.appspot.com",
  messagingSenderId: "895891743204",
  appId: "1:895891743204:web:c3437c46406dbcf707a7f1",
  measurementId: "G-RSX6MPXC8B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();


function submitfields(e) {
 
  
 

  firebase.database().ref('Bus'+e).set({
    enddate:document.getElementById('enddate'+e).value
  });

  var y = localStorage.getItem('count');
  for (var i = 8; i <= y; i++) {
    firebase.database().ref(`Bus${e}/routes`).push({
      route: document.getElementById('number' + e + i).value
     


    });

  }
  firebase.database().ref(`Bus${e}/fromto`).set({
    from: document.getElementById('fromgiven'+e ).value,
    to:document.getElementById('togiven'+e).value
  });
  
  alert('Route added successfully');
}


function showfields(e) {
      if(localStorage.getItem('login')==null){
        alert("Login needed!");
      }else{
        routes(e);
      }
   }
  function routes(e){
   var fromfield=document.getElementById('from'+e).value;
   var tofield=document.getElementById('to'+e).value;
    var ref=firebase.database().ref(`Bus${e}/fromto`);
    ref.on('value',function(data){
  var dbfrom=data.val().from;
  var dbto=data.val().to;
  if((dbfrom==fromfield)&&(dbto==tofield))
  {
    showdate(e);
    
  }
  else{
    alert('No Buses available for the location')
  }   
    });
    





}
function showdate(e)
{
  var ref = firebase.database().ref(`Bus${e}/enddate`);
// ref.on('value')
var enddate=document.getElementById('dateselect'+e).value;
  ref.on('value', function (snapshot) {
    var date=snapshot.val();
    console.log(date.localeCompare(enddate));
    if(enddate.localeCompare(date)<=0){
    // snapshot.forEach(function (childSnapshot) {
    //   console.log(childSnapshot.val())

    //   var routes = childSnapshot.val().route;
    //   console.log(routes)
    //   var li = document.createElement('li');
    //   var text = document.createTextNode(routes);
    //   li.appendChild(text);
    //   document.getElementById(`bus${e}route`).appendChild(li);
    routeshow(e);

    }
    else{
      alert('Bus not available on that date');
    }


    // });
  });
}

 function routeshow(e){
  var myNode = document.getElementById("busroute");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
document.getElementById('myModal').style.display="block";
   
   var ref=firebase.database().ref(`Bus${e}/routes`);
   ref.on('value', function (snapshot) {
 
    
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val())

      var routes = childSnapshot.val().route;
      console.log(routes)
      var li = document.createElement('li');
      var text = document.createTextNode(routes);
      li.appendChild(text);
      document.getElementById(`busroute`).appendChild(li);

    });
  });
}
var span = document.getElementsByClassName("close")[0];
var modal=document.getElementById('myModal');
span.onclick = function() {
  modal.style.display = "none";
}

function login(e)
{
  
  
  var email=document.getElementById('mail');
  
  
  var password=document.getElementById('password');


  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(res =>{
    console.log(res.user.email);
    if(e==1)
    { window.location.href='./admin.html';
  }
    else{
      localStorage.setItem('login','1');
      window.location.href='./frontpage.html';
    }
   

  })
  .catch(function(error) {
    console.log('12');
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  
    
  });
}
