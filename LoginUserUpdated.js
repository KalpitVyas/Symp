console.log("Hello");
var auth = firebase.auth();
//Following Function is For Login purpose.
function Login(){
	var email = document.getElementById("email");
	  var password = document.getElementById("password");
	  var promise = auth.signInWithEmailAndPassword(email.value,password.value);
	  promise.catch(e => alert(e.message));
	//const URL = "http://localhost:8080/Sympchecker/HomePage/index.html";
	//const win = window.open(URL, "_self");
}
//Following Function is for Create Account and Make the entry of the user in the firestore.
var db = firebase.firestore(); //Create Account.
function SignUp(){
	console.log("Account Creation is Process....");
	var Name = document.getElementById("NewName").value;
	var email = document.getElementById("NewEmailID").value;
	var Age = document.getElementById("NewAge").value;
	var Gender = document.getElementById("GetGender").value;
	const Password = document.getElementById("NewPassword").value;
	const ConfirmPassword = document.getElementById("ConfirmNewPassword").value;
	//const password = document.getElementById("CreatePassword").value;
	var PhoneNumber = document.getElementById("NewPhoneNumber").value;
	var Address = document.getElementById("NewAddress").value;
	var BloodGroup = document.getElementById("BloodGroup").value;
	var City = document.getElementById("NewCity").value;
	var State = document.getElementById("NewState").value;
	var PinCode = document.getElementById("NewPinCode").value;
	//Firebase Authentication 
	const promise = auth.createUserWithEmailAndPassword(email,Password);
	  promise.catch(e => alert(e.message));
		const Email = email.value;
	  alert("Accout Creation Successfull" + Email);
	//Code below is used to make the entry of new user in the firestore.
	db.collection("Users").doc(email).set({
    UserName: Name,
	UserEmail: email,
	UserAge: Age,
	UserAddress : Address,
	UserCity : City,
	UserState : State,
	UserPinCode : PinCode,
	UserPhoneNumber : PhoneNumber,
	UserGender : Gender,
	UserBloodGroup: BloodGroup
})
.then(function() {
    console.log("Document successfully written!");
	const URL = "http://localhost:8080/Sympchecker/HomePage/index.html";
	const win = window.open(URL, "_self"); 
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});	
}
//Following Function is for Sign Out
function SignOut(){
	auth.signOut();
	then(()=>{
		alert("You have been signed out successfully");	
	})
	.catch(error => {
		console.log(error);
	})
}

//Following Function is for Forgot password.
function ForgotPassword(){
	console.log("Link for Password Reset Sent Successfully");
	const GetEmail = document.getElementById("ResetEmail");
	const Reset = GetEmail.value;
	firebase.auth().sendPasswordResetEmail(Reset);
	
}
//After Login the user is redirected to the Home Page.
var user = firebase.auth().currentUser;
var email;
auth.onAuthStateChanged(function(user){
	if(user){
		//Returning the email of the currently logged in user.
		email = user.email;
		console.log("Logged in as : " + email);
		//If the user is already logged in the it will be redirected to the specified URL.
		const URL = "http://localhost:8080/Sympchecker/HomePage/index.html";
		console.log("Redirecting User to : " + URL);
		const win = window.open(URL, "_blank");
	}
	else{
		// When no user is Logged-in then Else part of this code will be executed.
	}
})
var db = firebase.firestore();
function GoogleAccount(){
	console.log("Google Authentication Started");
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
		console.log(user);
		document.getElementById("DisplayMail").innerHTML = user.email;
		db.collection("Users").doc(user.email).set({
    name: user.displayName,
	email: user.email
})
.then(function() {
    console.log("Document successfully written!");
			
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});	

  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
//Things to do
/*
1. Home page backend : The name of the logged in user should be displayed. (DONE)
2. The user should be able to write the data into the Firestore. 
3. Logged in User data/information should be retrived from the Firestore. (DONE)
4. The user should be able to sign out. (DONE)

Upcoming Task : 
*/
