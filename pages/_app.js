import { AuthProvider } from "../src/context/AuthContext";
// import { useRouter } from "next/router";
// Packages Styles
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-grid.min.css';


//styles
import '../styles/global.css'
import '../styles/style-en.css'


// layout 
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { Suspense } from "react";


// const { locale, locales, asPath } = useRouter();

function MyApp({ Component, pageProps, router  }) {
  if (router.pathname.startsWith('/login') || router.pathname.startsWith('/signup') || router.pathname.startsWith('/forget-password')) {

    return (
      <div className="wrap_app memb">
      <Header />
      <Component {...pageProps} />
      </div>
    )

}
  
else if (router.pathname.startsWith('/profile')) {

  return (
    <div className="profile" style={{background: '#F8FBFF'}}>
    <Component {...pageProps} />
    </div>
  )

}


  return (
    <>
    <div className="wrap_app1">
      <AuthProvider>
            <Header />
              <Component {...pageProps} />
            <Footer />
      </AuthProvider>
      </div>

    </>
  );
}

export default MyApp;
