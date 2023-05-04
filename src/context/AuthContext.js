import React, { createContext, useContext, useState, useEffect } from "react";
import  {useRouter}  from 'next/router';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 

export const useAuth = () => {
  return useContext(AuthContext);
};

// We provide our context with value
export const AuthProvider = ({ children }) => {
  const router = useRouter()

  const [displayName, setDisplayName] = useState("");
  const [token, setToken] = useState(null);
  const [localToken, setLocalToken] = useState(null);
  const [loading, setLoading] = useState(true);
//   const history = useHistory();


// sign up
const signup = (formData) => {

  let url = `${process.env.NEXT_PUBLIC_API_URI}/register`;
  return axios(url, {
            method: "post",
            headers: { "Content-Type": "application/json", },
            data: JSON.stringify(formData)
        })
        .then((response) => {
          const {id, name, email, phone, token} = response.data.data;


          localStorage.setItem( 'token', token );
          localStorage.setItem( 'name', name );
          localStorage.setItem( 'email', email );
          localStorage.setItem( 'phone', phone );
          // localStorage.setItem( 'student', JSON.stringify(student) );
          // }
          setDisplayName(name); 
          setToken(token); 
          toast.success( `Account has been created successfully, Hello ${name}!`,{})
          router.push('/')
        })
        .catch((error) => toast.error(`${error.message}`, {}));
        
    
};



// login
const login = (formData) => {

    let url = `${process.env.NEXT_PUBLIC_API_URI}/login`;
    return axios(url, {
              method: "post",
              headers: { "Content-Type": "application/json", },
              data: JSON.stringify(formData)
          })
          .then((response) => {
            const {id, name, email, phone, token} = response.data.data;
            // console.log(response.data.data.token);
            // store values in localStorage
            // if (typeof window !== "undefined") {
            // setLocalToken(token); 



            localStorage.setItem( 'token', token );
            localStorage.setItem( 'name', name );
            localStorage.setItem( 'email', email );
            localStorage.setItem( 'phone', phone );
            // localStorage.setItem( 'student', JSON.stringify(student) );
            // }
            setDisplayName(name); 
            setToken(token); 
            toast.success( `You are logged in successfully Hello ${name}!`,{})
            router.push('/')
          })
          .catch((error) => toast.error(`The data you entered is incorrect`, {}));
      
  };

// logout
  const logout = () => {
    
    confirmAlert({
      title: "Logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // logout!

            setDisplayName('');
            localStorage.removeItem( 'name' );
            localStorage.removeItem( 'email' );
            localStorage.removeItem( 'phone' );
            // token
            localStorage.removeItem( 'token' );
            setToken(null);
            // success message
            toast.success(`Successfully logged out`, {});        

          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("")
          },
        },
      ],
    });

  };

// forget password
const forgetPass = (formData) => {

  let url = `${process.env.NEXT_PUBLIC_API_URI}/forget-password`;
  return axios(url, {
            method: "post",
            headers: { "Content-Type": "application/json", },
            data: JSON.stringify(formData)
        })
        .then((response) => {
          toast.success( `${response.data.message}!`,{})
          // router.push('/')
        })
        .catch((error) => toast.error(`The data you entered is incorrect`, {}));
    
};



  // token changed
  const tokenChanged = () => {
    
    // logout!
    setDisplayName('');
    localStorage.removeItem( 'name' );
    localStorage.removeItem( 'email' );
    localStorage.removeItem( 'phone' );
    // token
    localStorage.removeItem( 'token' );
    setToken(null);
      router.push('/login')  

  };




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
    signup,
    login,
    logout,
    forgetPass,
    tokenChanged,
    displayName,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {!loading && children} */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthContext.Provider>
  );
};