import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// custom components
import Meta from "../src/components/Meta";
import Accordion from "../src/components/Accordion";

// styles
import styles from "./../styles/pages/work-with-us.module.css";

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
import { animate, motion, useAnimation, useAnimationControls } from "framer-motion";
import { useInView } from 'react-intersection-observer';

// site url
const URL = process.env.NEXT_PUBLIC_API_URI;

// FETCHING DATA FROM API
export const getStaticProps = async () => {

  // work With Us
  const workRes = await fetch(`${URL}/page/work-with-us`);
  const workData = await workRes.json();


  if (( !workData)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {  work: workData, }, // will be passed to the page component as props
    revalidate: 10, //In seconds
  };
};


const Work = ({work}) => {

// Work
const workData = work?.data;

// const [expanded, setExpanded] = useState(false);

const { ref, inView, entry } = useInView({
  /* Optional options */
  threshold:0,
});


// Counter Animation
function Counter({ from, to }) {
  const nodeRef = useRef();

    useEffect(() => {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          // node.textContent = value;
          node.textContent = value.toFixed(0);
        }
      });

      return () => controls.stop();
    }, [from, to]);

  return <span ref={nodeRef} />;
}




  return (
    <>
      <Meta title="studyblood | Work with us" />

      <main className="main-content">

           {/*================= Work  with us ==========*/}

           <motion.div className={`page_content ${styles.work_with_us}`}

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}>

                <Container>

                {workData &&
                workData.map((item, i) => (
                      <div key={i} className="list">
                        <h3>{item?.title}</h3>
                        <div className={styles.dot_list} dangerouslySetInnerHTML={{ __html: item?.description }}/>
                      </div>
                   ))}

                </Container>

          </motion.div>
  
      </main>

    </>
  );
};

export default Work;
