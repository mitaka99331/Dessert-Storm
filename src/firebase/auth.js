import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./index";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  //The logged user
  const [currentUser, setcurrentUser] = useState();

  //Not sure i need it
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const signup = (email, password) => {
    const userNames = JSON.parse(localStorage.getItem("userNames")).userNames;
    setUpdating(true);

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          .updateProfile({
            displayName: !user.displayName && userNames,
            photoURL:
              !user.photoURL &&
              "https://firebasestorage.googleapis.com/v0/b/dessertstorm-707ae.appspot.com/o/defaultUserIcon.png?alt=media&token=0e276d9c-3d51-4864-acba-5c78217c2543",
          })
          .then(() => setUpdating(false));
      })
      .catch((error) => {
        return error;
      });
  };

  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = () => auth.signOut();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  useEffect(() => {
    // let isMounted = true;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
      console.log("unmounting");
      // isMounted = false;
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && !updating && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
