import { useState } from "react";
import "./App.css";
import { TodoWrapper } from "./assets/components/TodoWrapper";
//firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxzYdcy-I9ov79SwnIPg9zNaDnkxvIirM",
  authDomain: "todocheo-ef450.firebaseapp.com",
  projectId: "todocheo-ef450",
  storageBucket: "todocheo-ef450.appspot.com",
  messagingSenderId: "551284725708",
  appId: "1:551284725708:web:df138f770635a278bdaf69",
  measurementId: "G-L1FLC8N78G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {user ? (
          <>
            <TodoWrapper />
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

//component to sign in with google
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default App;
