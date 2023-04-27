// react core
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
// nextjs components
import Image from "next/image";
import Link from "next/Link";


// custom components
import Meta from "../src/components/Meta";
import Accordion from "../src/components/Accordion";

// styles
import styles from "./../styles/pages/programs.module.css";

// bootstrap
import { Col, Container, Row } from "react-bootstrap";


// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { faArrowleft } from "@fortawesome/free-regular-svg-icons";


// tabs
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";

// custom nav tabs
const Tab = ({ children }) => {
  const { onClick, isActive } = useTabState();
  return (
    <li onClick={onClick} className={`${isActive ? styles.active : "inactive"} tab`}>
      {children}
    </li>
  );
};

// custom tab content
const Panel = ({ children }) => {
  const isActive = usePanelState();
  return isActive ? <>{children}</> : null;
};


// framer notion
import { motion, AnimatePresence } from "framer-motion";

// https://codesandbox.io/s/flamboyant-lucy-sgs1ys?file=/src/App.tsx


export default function Programs({ data}) {
// lang
  const { locale, locales, asPath } = useRouter();





  return (
    <>
      <Meta title="studyblood | Program details" />


      <main className="main-content">


{/* Programs tabs */}

<div className={styles.programs}>
  <Container>
  <Tabs>
    <Row className={styles.row_tabs}>
      <Col md={8}>
      <Panel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

         <h2>برنامج الروضة</h2>
      
         <ul className={styles.breadcrumb}>
          <li><Link href="/"><a>الرئيسية</a></Link></li>
          <span>/</span>
          <li>البرامج المتاحة</li>
          <span>/</span>
          <li>برنامج الروضة</li>
         </ul>


        <div className={styles.programs_details}>

        <h2 className={styles.title_details}>تفاصيل البرنامج</h2>

          <ul className={styles.programs_details_list}>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
          </ul>


        <h2 className={styles.title_output}>المخرجات المتوقعة</h2>

          <ul className={styles.programs_details_list_2}>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
          </ul>

          <Link href="/"><a className="special_btn"><span>  {locale == "en" ? "Join us" : "انضم الينا"}</span></a></Link>

        </div>

        </motion.div>

      </AnimatePresence>
      </Panel>

      <Panel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

         <h2>برنامج تمهيدى</h2>
      
         <ul className={styles.breadcrumb}>
          <li><Link href="/"><a>الرئيسية</a></Link></li>
          <span>/</span>
          <li>البرامج المتاحة</li>
          <span>/</span>
          <li>تمهيدى</li>
         </ul>

        <div className={styles.programs_details}>

        <h2 className={styles.title_details}>تفاصيل البرنامج</h2>

          <ul className={styles.programs_details_list}>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
          </ul>


        <h2 className={styles.title_output}>المخرجات المتوقعة</h2>

          <ul className={styles.programs_details_list_2}>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
            <li>يناسب الأطفال من عمر 4 سنوات حتى 5 سنوات ونصف</li>
            <li>مدة البرنامج: 3 أشهر</li>
            <li>بإمكانك التعلم عبر الجوال أو الأيباد أو اللابتوب</li>
            <li>حصص مباشرة تفاعلية مع المعلمة عبر الزوم</li>
          </ul>

          <Link href="/"><a className="special_btn"><span>  {locale == "en" ? "Join us" : "انضم الينا"}</span></a></Link>

        </div>

        </motion.div>

      </AnimatePresence>
      </Panel>

      </Col>


      <Col md={4}>
        <div className={styles.nav_pill}>
          <h2>ترتيب البرامج</h2>
            <ul className={styles.programs_nav_list_num}>
            <Tab>الروضة</Tab>
            <Tab>تمهيدى</Tab>
            </ul>
      </div>
      </Col>

    </Row>
    </Tabs>
  </Container>
</div>


      {/*============== Features of our programs ==========*/}
      <div className={styles.features}>
        <Container>
          <h2> مميزات برامجنا </h2>
          <Row style={{ maxWidth: '1115px',margin:' 0 auto'}}>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/learning.png" width="48" height="48" />
                  <h3>مناهج تعليمية قوية</h3>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/knowledge-1.png" width="48" height="48" />
                  <h3> التعليم بطريقة تفاعلية </h3>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/knowledge-1.png" width="48" height="48" />
                  <h3> الدمج بين التعلم واللعب </h3>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/learning.png" width="48" height="48" />
                  <h3>مناهج تعليمية قوية</h3>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/knowledge-1.png" width="48" height="48" />
                  <h3> التعليم بطريقة تفاعلية </h3>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className={styles.item}>
                  <Image alt="logo" src="/assets/knowledge-1.png" width="48" height="48" />
                  <h3> الدمج بين التعلم واللعب </h3>
              </div>
            </Col>
          </Row>
        </Container>
      </div>



        {/*============ Common Questions ===========*/}

        <div className={`${styles.common_ques} `}>
          <Container>
            <div className={styles.heading}>
              <h2> الاسئلة الشائعة </h2>
            </div>
            <div className="ques_wrapper">


              <div className={styles.ques}>

              <Accordion
                title="كم مدة البرنامج التدريبي"
                className={styles.que}
                content='<p>
                اعتقد ان احرف كنز علم اولادي مبادئ اللغة العربية في وقت
                قياسي ، بعد محاولات سابقة غير ناجحة مع منصات اخرى ،
                والافضل انه كل الدورات اونلاين . </p>'
                />               
              <Accordion
                title="كم مدة البرنامج التدريبي"
                className={styles.que}
                content='<p>
                اعتقد ان احرف كنز علم اولادي مبادئ اللغة العربية في وقت
                قياسي ، بعد محاولات سابقة غير ناجحة مع منصات اخرى ،
                والافضل انه كل الدورات اونلاين . </p>'
                />               
              <Accordion
                title="كم مدة البرنامج التدريبي"
                className={styles.que}
                content='<p>
                اعتقد ان احرف كنز علم اولادي مبادئ اللغة العربية في وقت
                قياسي ، بعد محاولات سابقة غير ناجحة مع منصات اخرى ،
                والافضل انه كل الدورات اونلاين . </p>'
                />               
              <Accordion
                title="كم مدة البرنامج التدريبي"
                className={styles.que}
                content='<p>
                اعتقد ان احرف كنز علم اولادي مبادئ اللغة العربية في وقت
                قياسي ، بعد محاولات سابقة غير ناجحة مع منصات اخرى ،
                والافضل انه كل الدورات اونلاين . </p>'
                />               


                <Link href="/">
                  <a
                    className={`${styles.more_btn_link}  d-flex align-items-center justify-content-end `}
                    style={{ maxWidth: "700px", width:'100%', margin: 'auto' }} >
                    لديك المزيد من الاستفسارات ! تواصل معنا{" "}
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      style={{ width: 20, marginRight: "12px" }}
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.start}>
                <h3>انت الان جاهر للبدء ؟</h3>
                <Link href="/">
                  <a className="special_btn"><span> انضم الينا </span></a>
                </Link>
              </div>
            </div>
          </Container>
        </div>




      </main>
    </>
  );
}

