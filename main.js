M.AutoInit()

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_N5-3wlIJ0Rvs2scqS4x2T5OaAuCgX1U",
    authDomain: "react-app-d226a.firebaseapp.com",
    databaseURL: "https://react-app-d226a.firebaseio.com",
    projectId: "react-app-d226a",
    storageBucket: "react-app-d226a.appspot.com",
    messagingSenderId: "618150277107",
    appId: "1:618150277107:web:2ec7e22e3f15a926316c86"
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
        <div class="container center"> 
        <div class="row">
        <div class="col s12 m6 offset-m3">
                    ${user.displayName ? `
                    <p class="flow-text">Welcome, ${user.displayName}!</p>
                    <img width="150" class="circle" src="${user.photoURL}">
                    <p>Email: ${user.email}</p>
                    ` :
            `<p class="flow-text">Welcome: ${user.email}!</p>`
        }
                    <button class="btn" onclick="signOut()">Sign out</button>
                </div>
            </div>
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
        console.log(user, token)
        // ...
        console.log(token, user)
    }).catch(function (error) {
        M.toast({ html: 'Ocurrió un error ' + error })
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
        console.log(user, token)
        // ...
        console.log(token, user)
    }).catch(function (error) {
        M.toast({ html: 'Ocurrió un error ' + error })
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
