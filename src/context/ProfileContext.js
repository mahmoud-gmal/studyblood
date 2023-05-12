import React, { createContext, useContext, useState, useEffect } from "react";
import  {useRouter}  from 'next/router';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProfileContext = createContext();
import axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 

export const useAuth = () => {
  return useContext(ProfileContext);
};

// We provide our context with value
export const ProfileProvider = ({ children }) => {
  const router = useRouter()

  const [displayName, setDisplayName] = useState("");
  const [customerror, seterror] = useState("");
  const [localToken, setLocalToken] = useState(null);
  const [loading, setLoading] = useState(true);
//   const history = useHistory();

const token = localStorage.getItem('token');



// Edit user account
const editAccount = (formData) => {

  let url = `${process.env.NEXT_PUBLIC_API_URI}/profile/update-profile`;
  return axios(url, {
            method: "post",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
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
        .catch(error => toast.error(`${error.response.data.message}`, {}) );
    
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
    editAccount,
    updatePass,
    tokenChanged,
    displayName,
    token
  };

  return (
    <ProfileContext.Provider value={value}>
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
    </ProfileContext.Provider>
  );
};