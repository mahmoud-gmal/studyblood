import { AuthProvider } from "../src/context/AuthContext";
import React, { useState} from "react";
// import { useRouter } from "next/router";
// Packages Styles
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-grid.min.css';

//styles
import '../styles/global.css'
import '../styles/bootstrap-table.css'


// layout 
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { Suspense } from "react";
import Header2 from "../src/components/layout/Header2";
import Footer2 from "../src/components/layout/Footer2";
import LoadingSpinner from "../src/components/LoadingSpinner.js";
// import LoadingSpinner from '../components/LoadingSpinner';


// const { locale, locales, asPath } = useRouter();

function MyApp({ Component, pageProps, router  }) {

  const [isLoading, setIsLoading] = useState(false);


  // Simulate a loading state change
  setTimeout(() => {
    setIsLoading(true);
  }, 2000);


  if (router.pathname.startsWith('/login') || router.pathname.startsWith('/signup') || router.pathname.startsWith('/forget-password')) {

    return (
      <AuthProvider>
        <div className="wrap_app memb">
          <Header2 />

            <Component {...pageProps} />
   
          <Footer2 />
        </div>
      </AuthProvider>
    )

}
  
else if (router.pathname.startsWith('/profile')) {

  return (
          <AuthProvider>
            <div className="wrap_app">
                      <Header />

            <Component {...pageProps} />
     
                      <Footer />
            </div>
          </AuthProvider>
  )

}


  return (
    <>
      <AuthProvider>

        <div className="wrap_app">

                <Header />
                {/* <Loader type="Oval" color="#000000" height={80} width={80} /> */}
            <Component {...pageProps} />

                {/* {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Component {...pageProps} />
          )} */}
                <Footer />
          </div>
      </AuthProvider>

    </>
  );
}

export default MyApp;
