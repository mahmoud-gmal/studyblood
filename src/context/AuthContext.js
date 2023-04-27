import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
import axios from 'axios';


export const useAuth = () => {
  return useContext(AuthContext);
};

// We provide our context with value
export const AuthProvider = ({ children }) => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
//   const history = useHistory();


  // credentials
//   const signup = (name, email, password) => {
//     return auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((cred) => {
//         cred.user
//           .updateProfile({
//             displayName: name,
//           })
//           .then(
//             () => {
//               // displayName has been updated successfully .
//               setDisplayName(name);
//             },
//             (error) => {
//               //displayName hasn't been updated successfully. An error happened.
//               console.log(error);
//             }
//           );
//       })
//       .then(() => {
//         toast.success(
//           `Welcome ${name}, You successfully created an account.`,
//           {}
//         );
//         // redirect after 3 second
//         window.setTimeout(() => {
//           history.push("/");
//         }, 4000);
//       })
//       .catch((error) => toast.error(error.message, {}));
//   };

  const login = (username, password) => {
        return axios.post( `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/jwt-auth/v1/token`, {username, password} )
            .then( res => {
                const { token, displayName, email } = res.data.data;
                localStorage.setItem( 'token', token );
                localStorage.setItem( 'userName', displayName );
                localStorage.setItem( 'email', email );
                // setLoading(false);
                setDisplayName(displayName);
            } )

  };

  const logout = () => {
    setDisplayName('');
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'userName' );
    localStorage.removeItem( 'email' );
  };


//   const resetPassword = (email) => {
//     return auth
//       .sendPasswordResetEmail(email)
//       .then(() => {
//         history.push("/login");
//         toast.success(
//           `Password Reseting link has been sent to your email ${email}!`,
//           {}
//         );
//       })
//       .catch((error) => toast.error(error.message, {}));
//   };

  // Cleanup subscription on unmount
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       // console.log(user ? user.displayName : null);
//       setLoading(false);
//     });
//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

  const value = {
    // signup,
    login,
    logout,
    // resetPassword,
    displayName,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  );
};