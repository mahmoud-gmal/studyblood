// react core
import React, { useState , useEffect, useRef } from "react";
import { useRouter } from "next/router";
// nextjs components
import Image from "next/image";
import Link from "next/Link";


// custom components
import Meta from "../src/components/Meta";
import Accordion from "../src/components/Accordion";

// styles
import styles from "./../styles/pages/profile.module.css";

// bootstrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";


// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTable, faBookBookmark, faBook, faCommentAlt, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
// import { faArrowleft } from "@fortawesome/free-regular-svg-icons";


// tabs
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import Fancybox from "../src/components/Fancybox.js";

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

// import "emoji-mart/css/emoji-mart.css";


// https://codesandbox.io/s/flamboyant-lucy-sgs1ys?file=/src/App.tsx


// hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required("هذا الحقل مطلوب")

});

// emoji-picker-react
// import dynamic from 'next/dynamic';

// const Picker = dynamic(
//   () => {
//     return import('emoji-picker-react');
//   },
//   { ssr: false }
// );
// import Picker from 'emoji-picker-react';

// package 2
import dynamic from 'next/dynamic';

export const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);



// import { Picker } from "emoji-mart";
// // import "emoji-mart/css/emoji-mart.css";


export default function Profile({ data}) {
// lang
  const { locale, locales, asPath } = useRouter();

// time in am/pm format 12h
const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ' <br/><span> ' + ampm + '</span>';
  return strTime;
}

  // date
  const date = new Date();
  const month = date.toLocaleString('en-US', {month: 'short'});
  const day = date.getDate()



// Chat form
const [messageInput, setMessageInput] = useState("");
// emojj btn
const [emojiVisible, setEmojiVisible] = useState(false);
const onEmojiClick = (event, emojiObject) => {
    setMessageInput((messageInput) => messageInput + emojiObject.emoji);
};

// useEffect(() => {
//   onEmojiClick;
// }, [messageInput]);


// validition
const { register,handleSubmit, formState: { errors }} = useForm({
  resolver: yupResolver(validationSchema)
});


const onSubmit = (data) =>{
  console.log(data);

}

  return (
    <>
      <Meta title="studyblood | Profile " />


      <main className="main-content">


{/* profile tabs */}

<div className={styles.profile}>
  <Container>
  <Tabs>
    <Row>


        {/*=============== Nav Bills =====================*/}
      <Col lg={3} className="p-0">
        <div className={styles.nav_content}>
            <ul className={styles.back}>
                <li><Link href="/"><a><FontAwesomeIcon icon={faArrowRight}  color={"#FFF"} width={20}/>  رجوع للرئيسية</a></Link></li>
                </ul>
                <div className={styles.avatar}>
                <div className="avater_logo">
                    <Image
                        src="/assets/profile/student.png"
                        alt="logo"
                        width="92"
                        height="92"
                        objectFit="contain"
                    />
                </div>
                    <h4 className={styles.avatar_text}>مرحبا أحمد !</h4>
                </div>   

                  <ul className={styles.profile_nav_list}>
                    <Tab><div className={styles.icon_wrapper}><FontAwesomeIcon icon={faTable} color={"#4269EF"} width={14} height={14}/></div><h3 className={styles.text}>جدول الحصص</h3></Tab>
                    <Tab><div className={styles.icon_wrapper}><FontAwesomeIcon icon={faBookBookmark}  color={"#4269EF"} width={14} height={14} /></div><h3 className={styles.text}>المناهج</h3></Tab>
                    <Tab><div className={styles.icon_wrapper}><FontAwesomeIcon icon={faBook} color={"#4269EF"} width={14} height={14}/></div><h3 className={styles.text}>حل الواجب</h3></Tab>
                    <Tab><div className={styles.icon_wrapper}><FontAwesomeIcon icon={faCommentAlt}  color={"#4269EF"} width={14} height={14}/></div><h3 className={styles.text}>شات مع الفصل</h3></Tab>
                  </ul>

       </div>
      </Col>


    {/*=============== TAB CONTENT =====================*/}
      <Col lg={9} className="p-0">

    {/*========== class schedule  ==============*/}
      <Panel>
      <div className={`${styles.tab_content} ${styles.class_schedule}`}>

        <Row>
            <Col md={3}>
                <h2 className={styles.table_title}>جدول الحصص</h2>
            </Col>
            <Col md={4}></Col>
            <Col md={5}>
            <div className={styles.full_date}>
                <div className={styles.time}>
                    <span dangerouslySetInnerHTML={{__html: formatAMPM(new Date)}}></span>
                </div>
                <div className={styles.date}>
                  <span>{day}</span><span><br />{month}</span>
                </div>
            </div>
            </Col>
        </Row>

        <div className={styles.days}>
            <div className={styles.day}>
                <div className={styles.day_head}> الأحد</div>
                <div className={styles.day_body}>
                    <h4>لغة عربية</h4>
                    <div className={styles.time}> 
                        <Image src="/assets/profile/stopwatch.png" alt=".." width="22" height="22" objectFit="contain"/>
                        <span>3:00</span>
                    </div>
                </div>
            </div>
            <div className={styles.day}>
                <div className={styles.day_head}> الأثنين</div>
                <div className={styles.day_body}>
                    <h4>لغة عربية</h4>
                    <div className={styles.time}> 
                        <Image src="/assets/profile/stopwatch.png" alt=".." width="22" height="22" objectFit="contain"/>
                        <span>3:00</span>
                    </div>
                </div>
            </div>
            <div className={styles.day}>
                <div className={styles.day_head}> الثلاثاء</div>
                <div className={styles.day_body}>
                    <h4>لغة عربية</h4>
                    <div className={styles.time}> 
                        <Image src="/assets/profile/stopwatch.png" alt=".." width="22" height="22" objectFit="contain"/>
                        <span>3:00</span>
                    </div>
                </div>
            </div>
            <div className={styles.day}>
                <div className={styles.day_head}> الأربعاء</div>
                <div className={styles.day_body}>
                    <h4>لغة عربية</h4>
                    <div className={styles.time}> 
                        <Image src="/assets/profile/stopwatch.png" alt=".." width="22" height="22" objectFit="contain"/>
                        <span>3:00</span>
                    </div>
                </div>
            </div>
            <div className={styles.day}>
                <div className={styles.day_head}> الخميس</div>
                <div className={styles.day_body}>
                    <h4>لغة عربية</h4>
                    <div className={styles.time}> 
                        <Image src="/assets/profile/stopwatch.png" alt=".." width="22" height="22" objectFit="contain"/>
                        <span>3:00</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </Panel>

    {/*========== curricula ==============*/}
      <Panel>
      <div className={`${styles.tab_content} ${styles.curricula}`}>

      <Row>
            <Col md={3}>
                <h2 className={styles.table_title}>جدول الحصص</h2>
            </Col>
            <Col md={4}></Col>
            <Col md={5}>
            <div className={styles.full_date}>
                <div className={styles.time}>
                    <span dangerouslySetInnerHTML={{__html: formatAMPM(new Date)}}></span>
                </div>
                <div className={styles.date}>
                  <span>{day}</span><span><br />{month}</span>
                </div>
            </div>
            </Col>
        </Row>

        <div className={styles.items}>

            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>
            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt2.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt2.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>
            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt3.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt3.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>
            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>
            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt2.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt2.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>
            <div className={styles.item}>
               <div className={styles.image_wrapper}>
                <Fancybox>
                  <Link href="/assets/ccrt3.png" data-fancybox="item">
                    <a className="img" data-fancybox="item">
                      <Image
                        alt=""
                        src="/assets/ccrt3.png"
                        width="239"
                        height="149"
                        objectFit="contain"
                      />
                      <i className="fa fa-play"></i>
                    </a>
                    </Link>
                </Fancybox> 
               </div>
                <div className={styles.item_des}>
                    <p>اسم الدرس يكتب هنا ليقوم الطالب بالإطلاع عليه فيما بعد</p>
                    <div className={styles.day_wrapper}>
                    <Image src="/assets/profile/stopwatch-1.png" alt=".." width="22" height="22" objectFit="contain"/>
                    <span className="day">يوم :</span>
                    <div className="date">9 سيبتمبر</div>
                    </div>

                </div>
            </div>



        </div>

        </div>

      </Panel>
    {/*========== chatform ==============*/}
      <Panel>
      <div className={`${styles.tab_content} ${styles.chatform}`}>

        <Row>
            <Col md={3}>
                <h2 className={styles.table_title}>جدول الحصص</h2>
            </Col>
            <Col md={4}></Col>
            <Col md={5}>
            <div className={styles.full_date}>
                <div className={styles.time}>
                    <span dangerouslySetInnerHTML={{__html: formatAMPM(new Date)}}></span>
                </div>
                <div className={styles.date}>
                  <span>{day}</span><span><br />{month}</span>
                </div>
            </div>
            </Col>
        </Row>

        <div className={styles.items}>


            <div className={`${styles.item} ${styles.receive}`}>
              <div className={styles.right_side}>
                <span className={styles.person_name}>عبدالله بدران</span>
                <div className={styles.message_wrapper}>
                  <p className={styles.message}>
                كيف حالك يا أحمد 
                هل انت جاهز لحل الواجب ؟
                </p></div>
                <span className={styles.time}>2:45</span>
              </div>
              <div className={styles.left_side}>
                <Image src="/assets/teacher-2.png" alt=".." width="35" height="35" objectFit="contain"/>
              </div>
            </div>

            <div className={`${styles.item} ${styles.send}`}>
              <div className={styles.right_side}>
                <div className={styles.message_wrapper}>
                  <p className={styles.message}>
                كيف حالك يا أحمد 
                هل انت جاهز لحل الواجب ؟
                </p></div>
                <span className={styles.time}>2:45</span>
              </div>
              <div className={styles.left_side}>
                <Image src="/assets/teacher-2.png" alt=".." width="35" height="35" objectFit="contain"/>
              </div>
            </div>


        </div>


        <div className="emoij-btn">
          <span onClick={() => setEmojiVisible(() => !emojiVisible)}>
            &#128512;
          </span>
          {emojiVisible && <Picker onEmojiClick={onEmojiClick} />}
        </div>


        {/* <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div> */}
        <div className={styles.form_chat}>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                type="text"
                defaultValue={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className={styles.text_input}
                placeholder="اكتب هنا .." 
                {...register("message")} isInvalid={!!errors.message}
                />

            {errors.message?.message && (<Form.Control.Feedback type="invalid">{errors.message?.message}</Form.Control.Feedback>)}
            </Form.Group>

            <div className={styles.form_btns}>
            <Button type="submit" className={styles.send_icon}> <FontAwesomeIcon width={46} height={39} color={'#80AEFF'}icon={faPaperPlane} /> </Button>     
            </div>

                </Form>              
            </div>

        </div>

      </Panel>
    {/*========== chatform ==============*/}
      <Panel>
      <div className={`${styles.tab_content} ${styles.chatform}`}>

        <Row>
            <Col md={3}>
                <h2 className={styles.table_title}>جدول الحصص</h2>
            </Col>
            <Col md={4}></Col>
            <Col md={5}>
            <div className={styles.full_date}>
                <div className={styles.time}>
                    <span dangerouslySetInnerHTML={{__html: formatAMPM(new Date)}}></span>
                </div>
                <div className={styles.date}>
                  <span>{day}</span><span><br />{month}</span>
                </div>
            </div>
            </Col>
        </Row>

        <div className={styles.items}>


            <div className={`${styles.item} ${styles.receive}`}>
              <div className={styles.right_side}>
                <span className={styles.person_name}>عبدالله بدران</span>
                <div className={styles.message_wrapper}>
                  <p className={styles.message}>
                كيف حالك يا أحمد 
                هل انت جاهز لحل الواجب ؟
                </p></div>
                <span className={styles.time}>2:45</span>
              </div>
              <div className={styles.left_side}>
                <Image src="/assets/teacher-2.png" alt=".." width="35" height="35" objectFit="contain"/>
              </div>
            </div>

            <div className={`${styles.item} ${styles.send}`}>
              <div className={styles.right_side}>
                <div className={styles.message_wrapper}>
                  <p className={styles.message}>
                كيف حالك يا أحمد 
                هل انت جاهز لحل الواجب ؟
                </p></div>
                <span className={styles.time}>2:45</span>
              </div>
              <div className={styles.left_side}>
                <Image src="/assets/teacher-2.png" alt=".." width="35" height="35" objectFit="contain"/>
              </div>
            </div>


        </div>


        <div className={styles.form_chat}>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                type="text"
                className={styles.text_input}
                placeholder="اكتب هنا .." 
                {...register("message")} isInvalid={!!errors.message}/>

            {errors.message?.message && (<Form.Control.Feedback type="invalid">{errors.message?.message}</Form.Control.Feedback>)}
            </Form.Group>

            <div className={styles.form_btns}>
            <Button type="submit" className={styles.send_icon}> <FontAwesomeIcon width={46} height={39} color={'#80AEFF'}icon={faPaperPlane} /> </Button>     
            </div>

                </Form>              
            </div>

        </div>

      </Panel>





      </Col>




    </Row>
    </Tabs>
  </Container>
</div>



      </main>
    </>
  );
}

