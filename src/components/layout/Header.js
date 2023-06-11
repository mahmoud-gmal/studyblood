import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./../../context/AuthContext";
import React, {useEffect, useState, useRef} from "react";
// import { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faBars, faTimes  } from "@fortawesome/free-solid-svg-icons";

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import axios from "axios";


import { Container, Row, Col } from "react-bootstrap";
import styles from "./../../../styles/layout/Header.module.css";







// React Custom Hook
function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}




export const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.4
    }
  },
  hide: {
    y: -20,
    opacity: 0
  }
};

const baseURL = `${process.env.NEXT_PUBLIC_API_URI}/page/home/logos`;


const Header = () => {

// header logo
  const [logo, setLogo] = useState();
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setLogo(response.data.data.header_logo);
    });
  }, []);




// responsive mobile
const [status, setStatus] = useState(false);

// mobile menu 
const handleClick = (event) =>{
  // if (ref.current && !ref.current.contains(event.target)) {
  //   alert("You clicked outside of me!");
  // }
  setStatus(!status)
}

const isMobScreen = useMediaQuery({ query: '(max-width: 991.9px)' })

const { token, logout, displayName } = useAuth();


const {ref,isComponentVisible,setIsComponentVisible} = useComponentVisible(true);

// const [localToken, setLocalToken] = useState(() => {
//   if (typeof window !== "undefined") {
//     // Code to initialize state on the client-side
//     return localStorage.getItem('token');
//   }
//   // Fallback initial state value for server-side rendering
//   return '';
// });

const [localToken, setLocalToken] = useState(null);

useEffect(() => {
  // Check if the value exists in localStorage
  const storedValue = localStorage.getItem('token');

  if (storedValue) {
    setLocalToken(storedValue);
  }
}, []);












// logout
const handleLogout =  async (e) =>{  
  e.preventDefault()
  try {
    await logout();
    setLocalToken(null);
    // router.push('/')
  } catch (error) {
    if(error){
      console.log(error.response);
    }
  }

}

// Token
useEffect(() => {
}, [localToken, token])









  return (

    <>
{!isMobScreen && (
      <div className={`${styles.header} ${styles.desktop_mode}`}>
      <Container>
          <Row className="align-items-center">
            {/* LOGO */}
            <Col md={3}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>
                    <Image
                      alt="logo"
                      src={logo ? logo : '/assets/logo.png'}
                      // src={logo}
                      width="301"
                      height="88"
                      // layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </Col>
            
            {/* Navbar */}
            <Col md={6}>
              <div className={styles.main_navbar}>
                <ul className={`d-flex justify-content-center`}>
                  <li>
                    <Link href="/"><a><Image alt=".."src="/assets/house.svg" width="22" height="22"
                  // layout="responsive"
                    />
                      {/* <FontAwesomeIcon style={{width: '20px', color: '#000'}} icon={faHouse} /> */}
                      </a></Link>
                  </li>
                  <li>
                    <Link href="/about"> About us</Link>
                  </li>
                  <li>
                    <Link href="/work-with-us">Work with us</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Left side */}
            <Col md={3}>
              <div className="left_side d-flex align-items-center justify-content-end">
                <div className={styles.btns}>

                {token || localToken ? 
                  (<><Link href="/profile">
                    <a className={`special_btn ${styles.btn_log} ${styles.active}`}>
                      <span> My Profile</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a onClick={handleLogout} className={`special_btn ${styles.btn_log} ${styles.btn_trans}`}>
                      <span>Log Out</span>
                    </a>
                  </Link></>) 

                  : ( <><Link href="/signup">
                    <a className={`special_btn ${styles.btn_log} ${styles.active}`}>
                      <span> Sign Up </span>
                    </a>
                  </Link>
                  
                  <Link href="/login">
                    <a className={`special_btn ${styles.btn_log} ${styles.btn_trans}`}>
                      <span> Log In</span>
                    </a>
                  </Link></>)}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
)}  




      {/*----------- Start Mobile mode -----------------*/}
{isMobScreen && (
      <div className={`${styles.header} ${styles.mobile_mode}`}>
        <Container>
          <Row className="align-items-center">
            {/* LOGO */}
            <Col xs={6}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>
                    <Image
                      alt="logo"
                      src={logo ? logo : '/assets/logo.png'}
                      width="301"
                      height="88"
                      // layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </Col>
            
            {/* Navbar */}
            <Col xs={6}>
              <div className={styles.main_navbar}>
                <div  style={{textAlign:'right'}}className={`${styles.menu_toggle}`}>
                  {/* <FontAwesomeIcon icon={faBars} onClick={handleClick}/> */}
                  {!status ? (<FontAwesomeIcon style={{width:'27px'}} icon={faBars} onClick={handleClick}/>) : (
                    <div onClick={handleClick}><FontAwesomeIcon style={{width:'27px'}}  icon={faTimes} /></div>
                  )}
                  

                  </div>
                {status && (
                  <motion.ul className={`d-flex flex-direction-column ${styles.mobile_list_nav}`} key={status} variants={variants} animate={'show'} initial="hide">
                <div className={styles.logo_wraper} style={{padding: '20px'}}>
                <Link href="/"><a className={styles.mobile_logo} onClick={handleClick}>
                  <Image
                      alt="logo"
                      src={logo ? logo : '/assets/logo.png'}
                      width="301"
                      height="88"
                      
                      // layout="responsive"
                    />
                    </a>
                </Link>
                 {/* <div className={styles.close_icon} onClick={handleClick}><FontAwesomeIcon icon={faTimes} /></div> */}
              </div>

              <li>
                    <Link href="/"><a onClick={handleClick}><Image alt=".."src="/assets/house.svg" width="22" height="22"
                  // layout="responsive"
                    />
                      {/* <FontAwesomeIcon style={{width: '20px', color: '#000'}} icon={faHouse} /> */}
                      </a></Link>
                  </li>
                  <li>
                    <Link href="/about"><a onClick={handleClick}>About us</a></Link>
                  </li>
                  <li>
                    <Link href="/work-with-us"><a onClick={handleClick}>Work with us</a></Link>
                  </li>
                  <li>
                    <Link href="/contact"><a onClick={handleClick}>Contact us</a></Link>
                  </li>
                <div className={`${styles.btns} ${styles.btns_mob}`}>

                {token || localToken ? 
                  (<><Link href="/profile">
                    <a className={`special_btn ${styles.btn_log} ${styles.active}`} onClick={handleClick}>
                      <span> My Profile</span>
                    </a>
                  </Link>
                  <Link href="/" >
                    <a onClick={handleLogout} className={`special_btn ${styles.btn_log}`}>
                      <span>Log Out</span>
                    </a>
                  </Link></>) 

                  : ( <><Link href="/signup">
                    <a className={`special_btn ${styles.btn_log} ${styles.active}`} onClick={handleClick}>
                      <span> Sign Up </span>
                    </a>
                  </Link>
                  
                  <Link href="/login">
                    <a className={`special_btn ${styles.btn_log}`} onClick={handleClick}>
                      <span> Log In</span>
                    </a>
                  </Link></>)}


              </div>
                </motion.ul>

                )}
              </div>
            </Col>

          </Row>
        </Container>
      </div>   
)}  
      {/*----------- End Mobile mode -----------------*/}


 


    </>
  );
};

export default Header;
