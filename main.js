// Your web app's Firebase configuration
const firebaseConfig = {
   /*
   ** Firebase config data
   */
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

registerForm.onsubmit = e => {
    e.preventDefault();

    let email = registerEmail.value,
        password = registerPassword.value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            M.toast({
                html: error.message,
                classes: 'red'
            });

        });
}

loginForm.onsubmit = e => {
    e.preventDefault();

    let email = loginEmail.value,
        password = loginPassword.value

    firebase.auth().signInWithEmailAndPassword(email, password)
        // .then(response => console.log(response))
        .catch(error => {
            // Handle Errors here.
            M.toast({
                html: error.message,
                classes: 'red'
            });

        });
}

function watch() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // ...
            console.log(user.email, 'is logged');
            showContent(user)
        } else {
            // User is signed out.
            // ...
            console.log('No user logged');
        }
    });
}

watch();

function showContent(user) {
    document.body.innerHTML = `
        <div class="container center"> ${user.displayName ? `
            <p class="flow-text">Welcome, ${user.displayName}!
            <img width="150" class="circle" src="${user.photoURL}">
            <p>Email: ${user.email}</p>
            </p>
            ` : `<p class="flow-text">Welcome: ${user.email}!</p>`
        }
            <button class="btn" onclick="signOut()">Sign out</button>
        </div>
    `
}

function signOut() {
    firebase.auth().signOut()
        .then(() => window.location.href = '/')
        .catch(err => console.log(err))
}

google.onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token, user)
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error)
    });
}
facebook.onclick = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token, user)
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error)
    });
}
