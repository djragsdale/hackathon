var ref = new Firebase('https://glaring-fire-2226.firebaseio.com/');

//check if user is logged in
var LblEmail = document.getElementById("UserPanelText");
var authData = ref.getAuth();
if (authData) {
    // user authenticated with Firebase
     LblEmail.innerHTML = authData.password.email;
} else {
    // user is logged out
    LblEmail.innerHTML = "Not Logged In";
}

function CreateNewUser(email, password) {
    var txtAlert = document.getElementById("LogInAlert");

    ref.createUser({
        email    : email,
        password : password
    }, function(error) {
        if (error === null) {
            txtAlert.className = "alert alert-success"
            txtAlert.innerHTML = "Success! Account created."
            txtAlert.style.visibility = "visible"

            LogIn(email, password);

        } else {
            txtAlert.className = "alert alert-danger"
            txtAlert.innerHTML = "Error Creating User"
            txtAlert.style.visibility = "visible";
        }
    });


}

function LogIn(email, password) {
    var txtAlert = document.getElementById("LogInAlert");
    var txtUserInfo = document.getElementById("UserPanelText");

    ref.authWithPassword({
        email    : email,
        password : password
    }, function(error, authData) {
        remember: "sessionOnly"
        if (error === null) {
            // user authenticated with Firebase
            txtAlert.className = "alert alert-success"
            txtAlert.innerHTML = "Success! You are logged in."
            txtAlert.style.visibility = "visible"
            txtUserInfo.innerHTML = email
        } else {
            txtAlert.className = "alert alert-danger"
            txtAlert.innerHTML = "Error Authenticating User"
            txtAlert.style.visibility = "visible";

            txtUserInfo.innerHTML = "Not Logged In"
        }
    });

}

function SendResetEmail(email) {
    var txtAlert = document.getElementById("LogInAlert");

    ref.resetPassword({
        email : email
    }, function(error) {
        if (error === null) {
            txtAlert.className = "alert alert-success"
            txtAlert.innerHTML = "Email sent"
            txtAlert.style.visibility = "visible"
        } else {
            txtAlert.className = "alert alert-danger"
            txtAlert.innerHTML = "Error sending email/ account not found"
            txtAlert.style.visibility = "visible";
        }
    });
}

function LogOut() {
    ref.unauth();

    var txtUser = document.getElementById("UserPanelText").innerHTML = "Not Logged In";
}


