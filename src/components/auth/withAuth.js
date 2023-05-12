import { useEffect, useState } from "react";
import { useAuth } from "./../../context/AuthContext";
import Header2 from "../layout/Header-2";
import Login from "../../../pages/login";


const withAuth = Component => {



    const Auth = (props) => {
      // Login data added to props via redux-store (or use react context for example)

      const { token } = useAuth();
      // const [localToken, setlocalToken] = useState(null);

      const [localToken, setLocalToken] = useState(null);
      useEffect(() => {
        // const localToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;
        setLocalToken(localStorage.getItem('token'))
      }, [localToken])
      


      // useEffect(() => {
        // setlocalToken(localStorage.getItem('token'))
        // If user is not logged in, return login component
        if (!token && !localToken) {
          return (
            <>
            {/* <Header2 /> */}
            <Login />
            </>

            
          );
        }
    // },[token, localToken])


  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    // if (Component.getInitialProps) {
    //   Auth.getInitialProps = Component.getInitialProps;
    // }
  
    return Auth;
  };
  
  export default withAuth;