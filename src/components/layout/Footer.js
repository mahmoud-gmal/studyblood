import Link from "next/Link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import React, {useEffect, useState} from "react";


// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faPlaneUp,} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import styles from "./../../../styles/layout/Footer.module.css";

import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_API_URI}/page/home/logos`;


const Footer = () => {

// footer logo
const [logo, setLogo] = useState();
useEffect(() => {
  axios.get(baseURL).then((response) => {
    setLogo(response.data.data.footer_logo);
  });
}, []);


const isBrowser = () => typeof window !== 'undefined';
// back to top
const [visible, setVisible] = useState(false)


const toggleVisible = () => {
const scrolled = document.documentElement.scrollTop;
if (scrolled > 300){
  setVisible(true)
} 
else if (scrolled <= 300){
  setVisible(false)
}
};

const scrollToTop = () =>{
window.scrollTo({
  top: 0, 
  behavior: 'smooth'
  /* you can also use 'auto' behaviour
     in place of 'smooth' */
});
};
isBrowser() ? window.addEventListener('scroll', toggleVisible) : '';


  return (
    <>
      <div className={styles.footer}>
      <button class="up" onClick={scrollToTop}  style={{display: visible ? 'inline' : 'none'}}>
        <FontAwesomeIcon icon={faPlaneUp} />
        </button>
          <div className={styles.footer_tp}>
        <Container>


            <div className={styles.logo_footer}>
                <Link href="/">
                  <>
                    <Image
                      alt="logo"
                      src={logo ? logo : '/assets/logofooter.png'}
                      width="236"
                      height="204"
                      objectFit="contain"
                    />
                  </>
                </Link>
              </div>

                <ul className={styles.links}>
                  <li>
                    <Link href="/">home</Link>
                  </li>
                  <li>
                    <Link href="/about">about us</Link>
                  </li>
                  <li>
                    <Link href="/work-with-us">work with us</Link>
                  </li>
                  <li>
                    <Link href="/contact">contact us</Link>
                  </li>
                </ul>
                </Container>
             </div>


            <div className={styles.copyrights}>
              <Container>
                <p> all rights reserved to studyblood </p>
              </Container>
            </div>




      </div>

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
    </>
  );
};

export default Footer;
