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
  const [customerror, seterror] = useState("");
  const [token, setToken] = useState(null);
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
        .catch((error) => toast.error(`${error.response.data.message}`, {}));
        
    
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
          .catch(error => toast.error(`${error.response.data.message}`, {}) );
      
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
        .catch(error => toast.error(`${error.response.data.message}`, {}) );
    
};

// Edit user account
const editAccount = (formData) => {

  let url = `${process.env.NEXT_PUBLIC_API_URI}/profile/update-profile`;
  return axios(url, {
            method: "post",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
             },
            data: JSON.stringify(formData)
        })
        .then((response) => {

              // Getting data
              const {id, name, email, phone, token} = response.data.data;
              // Setting data in localstorage 
              localStorage.setItem( 'token', token );
              localStorage.setItem( 'name', name );
              localStorage.setItem( 'email', email );
              localStorage.setItem( 'phone', phone );
              // Setting data in state 
              setDisplayName(name); 
              setToken(token); 
              // notify success
              toast.success( `Profile has been updated successfully, ${name}!`,{})
        })
        .catch(error => toast.error(`${error.response.data.message}`, {}) );
    
};

// update user Password
const updatePass = (formData) => {

  let url = `${process.env.NEXT_PUBLIC_API_URI}/profile/update-password`;
  return axios(url, {
            method: "post",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
             },
            data: JSON.stringify(formData)
        })
        .then((response) => {
          // Getting data
          const {token} = response.data.data;
          // Setting data in localstorage 
          localStorage.setItem( 'token', token );
          // Setting data in state 
          setToken(token); 
          // notify success
          toast.success( `Password has been updated successfully!`,{})

          // toast.success( `${response.data.message}!`,{})
          console.log(response.data.status);
          // router.push('/')
        })
        .catch((error) => toast.error(`${error.response.data.message}`, {}));
    
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
    editAccount,
    updatePass,
    tokenChanged,
    displayName,
    token,

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