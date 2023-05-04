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
import form from "./../styles/pages/form.module.css";
// bootstrap
import { Badge, Button, Col, Container, Form, Row, Table } from "react-bootstrap";

// animation
import { motion } from 'framer-motion';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />

//=== react-tabs ===//
import Tabs from "react-tabs/lib/components/Tabs";
import TabList from "react-tabs/lib/components/TabList";
import Tab from "react-tabs/lib/components/Tab";
import TabPanel from "react-tabs/lib/components/TabPanel";




// https://codesandbox.io/s/flamboyant-lucy-sgs1ys?file=/src/App.tsx


// hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AnimatePresence } from "framer-motion";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "must be at least 3 characters."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email."),
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(phoneRegExp, 'Phone number is not valid'),


  
});








// import { Picker } from "emoji-mart";
// // import "emoji-mart/css/emoji-mart.css";


export default function Profile({ }) {


  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };



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
<div className={`page_content ${form.main_content} ${styles.profile}`}>

  <Container>
  <Tabs selectedTabClassName="active">
    <Row className={styles.row_tabs}>

    <Col md={4}>
        <div className={styles.nav_pill}>
            <TabList className="profile_nav_pills">
                <Tab>PREVIOUS TIMED TESTS</Tab>
                <Tab>Previous Questions TESTS</Tab>
                <Tab>Previous Mock TESTS</Tab>
                <Tab>Edit Account</Tab>
                <Tab>edit password</Tab>
            </TabList>
               
      </div>
      </Col>

      <Col md={8}>

      {/* PREVIOUS TIMED TESTS */}
      <TabPanel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

         <h2> PREVIOUS TIMED TESTS </h2>


         <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number Of Question</th>
          <th>Status</th>
          <th>Review /Contiune</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Exit Without Saving</td>
          <td><Link href="/"><a className="table_btn continue"><span> Contiune </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed 20%</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>



      </tbody>
    </Table>

        </motion.div>

      </AnimatePresence>
      </TabPanel>


      {/* Previous Questions TESTS */}
      <TabPanel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

         <h2> Previous Questions TESTS </h2>


         <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number Of Question</th>
          <th>Status</th>
          <th>Review /Contiune</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Exit Without Saving</td>
          <td><Link href="/"><a className="table_btn continue"><span> Contiune </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed 20%</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>



      </tbody>
    </Table>

        </motion.div>

      </AnimatePresence>
      </TabPanel>


      {/* Previous Mock TESTS */}
      <TabPanel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

         <h2> Previous Mock TESTS </h2>


    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number Of Question</th>
          <th>Status</th>
          <th>Review /Contiune</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Exit Without Saving</td>
          <td><Link href="/"><a className="table_btn continue"><span> Contiune </span></a></Link> </td>
        </tr>
        <tr>
          <td>Cardiliogy</td>
          <td>20 Question</td>
          <td>Completed 20%</td>
          <td><Link href="/"><a className="table_btn"><span> Review </span></a></Link> </td>
        </tr>
      </tbody>
    </Table>

        </motion.div>

      </AnimatePresence>
      </TabPanel>


      {/* Edit Account */}
      <TabPanel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content_form}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

<div className={form.form_wrapper} style={{ margin: '0'}}>
<h3> personal  <span>information</span></h3>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>

      <Form.Group controlId="nameID">
                    <Form.Label> Name: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Abdallah Hammad" 
                      {...register("name")} isInvalid={!!errors.name}/>
                    {errors.name?.message && (<Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>)}
                  </Form.Group>

                  <Form.Group controlId="emailID">
                  <Form.Label> E-Mail: </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Hralryad@Gmail.Com" 
                    {...register("email")} isInvalid={!!errors.email}/>
                  {errors.email?.message && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
                </Form.Group>

                  <Form.Group controlId="mobileID">
                  <Form.Label> Mobile: </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="54 1234567" 
                    {...register("phone")} isInvalid={!!errors.phone}/>
                  {errors.phone?.message && (<Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>)}
                </Form.Group>



                <div className={form.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn'> <span> Save </span> </Button>     
                    </div>

            </Form>

            </div>


        </motion.div>

      </AnimatePresence>
      </TabPanel>


      {/* Edit Password */}
      <TabPanel>
      <AnimatePresence exitBeforeEnter>
      <motion.div 
          className={styles.tab_content_form}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
      >

<div className={form.form_wrapper} style={{ margin: '0'}}>
<h3> Edit   <span>password</span></h3>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>

      <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> current password : </Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="********"
            {...register("password")} isInvalid={!!errors.password}/>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
          {errors.password?.message && (<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>)}
        </Form.Group>

        <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> new password : </Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="********"
            {...register("password")} isInvalid={!!errors.password}/>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
          {errors.password?.message && (<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>)}
        </Form.Group>

                <div className={form.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn'> <span> Save </span> </Button>     
                    </div>

            </Form>

            </div>


        </motion.div>

      </AnimatePresence>
      </TabPanel>





      </Col>


    </Row>
    </Tabs>
  </Container>
</div>







      </main>
    </>
  );
}

