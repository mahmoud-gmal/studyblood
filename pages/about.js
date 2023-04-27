import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/Link";
import { useRouter } from "next/router";
// custom components
import Meta from "../src/components/Meta";


// styles
import styles from "./../styles/pages/about.module.css";

// bootstrap
import { Col, Container, Row } from "react-bootstrap";

// animation
import { animate, motion, useAnimation, useAnimationControls } from "framer-motion";
import { useInView } from 'react-intersection-observer';


// site url
const URL = process.env.NEXT_PUBLIC_API_URI;

// FETCHING DATA FROM API
export const getStaticProps = async () => {

  // About
  const aboutRes = await fetch(`${URL}/page/about-us`);
  const aboutData = await aboutRes.json();


  if (( !aboutData)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {  about: aboutData, }, // will be passed to the page component as props
    revalidate: 10, //In seconds
  };
};


const About = ({about}) => {
// about
const aboutData = about?.data;


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
      <Meta title="studyblood | About" />

      <main className="main-content">

          <div className={`page_content ${styles.about}`}>

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
  
      </main>

    </>
  );
};

export default About;
