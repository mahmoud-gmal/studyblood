import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState, useRef} from "react";
// import { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCaretDown, faBars, faTimes  } from "@fortawesome/free-solid-svg-icons";

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import axios from "axios";


import { Container, Row, Col } from "react-bootstrap";
import styles from "./../../../styles/layout/Header-2.module.css";






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


const Header2  = () => {

// header logo
  const [logo, setLogo] = useState();
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setLogo(response.data.data.header_logo);
    });
  }, []);












  return (

    <>

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
                      width="225"
                      height="65"
                      // layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </Col>
            
            {/* Navbar */}
            <Col md={6}> </Col>

            {/* Left side */}
            <Col md={3}> </Col>
          </Row>
        </Container>
      </div>
 






 


    </>
  );
};

export default Header2 ;
