var auth = firebase.auth(); //Assigning the Authentication Library.
var user = firebase.auth().currentUser; //Getting the Current User who is logged in.
var email; var name; 
function ForgotPassword(){
	console.log("Hey");
	const GetEmail = document.getElementById("ResetPass");
	const Reset = GetEmail.value;
	firebase.auth().sendPasswordResetEmail(Reset);	
}
auth.onAuthStateChanged(function(user){
	if(user){
		//Returning the email of the currently logged in user.
		email = user.email;
		name = user.displayName;
		console.log("Logged in as : " + email);  //Displaying Email on Console
		console.log("Name is : " + name); //Displaying the Name of the Logged in User on Console.
		document.getElementById("WelcomeUser").innerHTML = email; //Displaying the Email of the User on Website.
		//Retirving The Data of the user.
		console.log("Getting the information of the user");
		var db = firebase.firestore();
		db = db.collection("Users").doc(email);
		db.get().then(function(doc) {
    	if (doc.exists) {
        	console.log("Document data:", doc.data());
			console.log(doc.data().UserName);
			document.getElementById("UserName").innerHTML = doc.data().UserName;
			document.getElementById("DisplayAge").innerHTML = doc.data().UserAge;
			document.getElementById("UserGender").innerHTML = doc.data().UserGender;
			document.getElementById("PhoneNumber").innerHTML = doc.data().UserPhoneNumber;
			
    	} else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
		}
		}).catch(function(error) {
    console.log("Error getting document:", error);
		});
	}
	else{
		// When no user is Logged-in then Else part of this code will be executed.
	}
})