// react core
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
// nextjs components
import Image from "next/image";
import Link from "next/link";


// custom components
import Meta from "../src/components/Meta";
import Accordion from "../src/components/Accordion";

// styles
import styles from "./../styles/pages/index.module.css";

// bootstrap
import { Col, Container, Row } from "react-bootstrap";

// SWIPER
// import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
SwiperCore.use([Navigation, Pagination]);

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { faArrowleft } from "@fortawesome/free-regular-svg-icons";

// animation
import { animate, motion, useAnimation, useAnimationControls, useTrail  } from "framer-motion";
import { useInView } from 'react-intersection-observer';


// site url
const URL = process.env.NEXT_PUBLIC_API_URI;

// FETCHING DATA FROM API
export const getStaticProps = async () => {

  // Banner
  const bannerRes = await fetch(`${URL}/page/home/slider`);
  const bannerData = await bannerRes.json();

  // About
  const aboutRes = await fetch(`${URL}/page/about-us`);
  const aboutData = await aboutRes.json();

  // Topics
  const topicsRes = await fetch(`${URL}/page/home/topics`);
  const topicsData = await topicsRes.json();



  if ((!bannerData, !aboutData,  !topicsData)) {
    return {
      notFound: true,
    };
  }
  return {
    props: { banner: bannerData , about: aboutData, topics: topicsData}, // will be passed to the page component as props
    revalidate: 10, //In seconds
  };
};





export default function Home({ banner, about, topics}) {

// Destructuring api data

// banner
const bannerData = banner?.data;

// about
const aboutData = about?.data;

// topics
const topicsData = topics?.data;



  // const [expanded, setExpanded] = useState(false);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2, // 0 = fully outside the viewport, 1 = fully inside the viewport
  });


  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };




  return (
    <>
      <Meta title="StudyBlood | Home" />
      
      <main className="main-content">

        {/*================= ٍBanner ==========*/}
        <motion.div className={styles.banner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
        >
            <div className={styles.im_bg} style={{backgroundImage: `url(${bannerData[0]?.image})`}}>
                <Container>

                    <div className={styles.text_banner}>
                    <h2>
                    {bannerData[0]?.title}
                    </h2>
                    <p>
                    {bannerData[0]?.description}
                    </p>
                    <Link href="#topics">
                    {/* <Link href={bannerData[0]?.button_link ? bannerData[0]?.button_link : '#topics'}> */}
            
                        <a className="special_btn"><span>  {bannerData[0]?.button_content} </span> </a>
                    </Link>
                    </div>

                </Container>
            </div>
          </motion.div>

        {/*================= about ==========*/}

        <div className={styles.about} >

                <Container>

                {aboutData &&
                aboutData.map((item, i) => (
                  <Row key={i} className={`mb-5 ${ (i + 1) % 2 === 0 ? 'flex-row-reverse': ''}`}>
                    <Col md={6}>
                      <div className="text_about">
                        <h3 className="special_heading">{item?.title}</h3>
                        <p className="special_text">{item?.description}</p>
                      </div>
                    </Col>
                    <Col md={6}> 
                    <div className="ab_im_wrapper">
                      <Image
                        alt="..."
                        src={item?.image}
                        width={600}
                        objectFit="cover"
                        height={323}
                      />
                    </div>
                    </Col>
                  </Row>
              ))}

                </Container>

          </div>


        {/*================= Topics ==========*/}

        <motion.div id="topics" className={styles.topics}
        // ref={ref}
        // initial="hidden"
        // animate={inView ? 'visible' : 'hidden'}
        // variants={variants}
              >

                <Container>
                  <div className="heading text-center">
                  <h2 className="special_heading">{topicsData?.structure?.title}</h2>
                    </div>
                  <Row>

                  {topicsData?.topics &&
                topicsData?.topics.map((item, i) => (

                    <Col key={i} md={4}>
                      <div className={styles.item}>
                        <div className="box_im">
                        <Image
                        alt="..."
                        src={item?.image}
                        width={600}
                        objectFit="cover"
                        height={323}
                      />
                        </div>
                        <div className={styles.box_txt}>
                        <h3>{item?.name}</h3>
                        <p> {item?.description} </p>
                        {/* <div className="btns_wrapper">
                          <Link href="/"><a className="special_btn"><span> Take A Test </span> </a></Link>
                        </div> */}
                        </div>
                      </div>
                    </Col>

))}

                  </Row>



                </Container>

          </motion.div>
 

 
      </main>
    </>
  );
}

