// react core
import React, { useState , useEffect, useRef } from "react";
import { useAuth } from "./../src/context/AuthContext";
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

// 
import axios from "axios";


// https://codesandbox.io/s/flamboyant-lucy-sgs1ys?file=/src/App.tsx


// hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AnimatePresence } from "framer-motion";
import withAuth from "../src/components/auth/withAuth";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



const schema1 = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "must be at least 3 characters."),
  email: Yup.string()
    .required("E-mail is required.")
    .email("E-mail field must be a valid email."),
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(phoneRegExp, 'Phone number is not valid')
});

const schema2 = Yup.object().shape({
  password: Yup.string()
    .required(".Password is required")
    .min(8, 'Password is too short - must be at least 8 characters long.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin characters.'),
  newpassword: Yup.string()
    .required(".Password is required")
    .min(8, 'Password is too short - must be at least 8 characters long.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin characters.'),
});






// import { Picker } from "emoji-mart";
// // import "emoji-mart/css/emoji-mart.css";


const Profile = () =>{

  const router = useRouter();

  
// context
const { editAccount, updatePass, token,tokenChanged } = useAuth();

const [prevQueTests, setPrevQueTests] = useState();
const [prevTimeTests, setPrevTimeTests] = useState();
const [prevMockTests, setPrevMockTests] = useState();


// Token

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
}, [token])




// profile exam

useEffect(() => {


  // PREVIOUS TIMED TESTS
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/profile/previous-time`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data.data);
        setPrevTimeTests(response.data.data);
      },
      (error) => {
        // if token changed so become unathoried request
        // if(error.response.status == 401){
          // router.push('/login')
          tokenChanged();
        // }
        console.log("hhhhhhhhh");
      }
    );

  // Previous Questions TESTS
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/profile/previous-question`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data.data);
        setPrevQueTests(response.data.data);
      },
      (error) => {
        // if token changed so become unathoried request
        // if(error.response.status == 401){
          // router.push('/login')
          tokenChanged();
        // }
        // console.log(error.response);
      }
    );


  // Previous Mock TESTS
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/profile/previous-mock`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data.data);
        setPrevMockTests(response.data.data);
      },
      (error) => {
        // if token changed so become unathoried request
        // if(error.response.status == 401){
          // router.push('/login')
          tokenChanged();
        // }
        // console.log(error.response);
      }
    );






  }, [])




// password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
// new password
  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };




  const defaultValues = typeof window !== 'undefined' ? {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('phone'),
  } : {};


// validition

const EditAccount = useForm({
  resolver: yupResolver(schema1),
  mode: 'onTouched', // enable "on touch" validation
  defaultValues,
  // defaultValues: { input1: '', input2: '' },
});

const UpdatePass = useForm({
  resolver: yupResolver(schema2),
  mode: 'onTouched', // enable "on touch" validation
  // defaultValues: { input1: '', input2: '' },
});



const onSubmitEditAccount = async (values) => {

  const formData = {
    name: values.name,
    email: values.email,
    phone: values.phone,
  }

  await editAccount(formData);

  // try {
    // await editAccount(formData);
    // history.push("/");
  // } catch (error) {
  //   console.log('Error:', error.message);
  // }

};



const onSubmitUpdatePass = async (values) => {
  const formData = {
    current_password: values.password,
    new_password: values.newpassword,
  }
  try {
    await updatePass(formData);
    // history.push("/");
  } catch (error) {
    console.log('page error');
    console.log(error);
  }
};


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

      {prevTimeTests &&
                prevTimeTests.map((item, i) => (
        <tr key={i}>
          <td>{item.topic_name}</td>
          <td>{item.details}</td>
          <td>{item.status}</td>
          <td><Link href="/"><a className={`table_btn ${item.operation != "Review" ? "continue" : ""}`}><span> {item.operation} </span></a></Link> </td>
        </tr>
        ))}



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
      {prevQueTests &&
                prevQueTests.map((item, i) => (
        <tr key={i}>
          <td>{item.topic_name}</td>
          <td>{item.details}</td>
          <td>{item.status}</td>
          <td><Link href="/"><a className={`table_btn ${item.operation != "Review" ? "continue" : ""}`}><span> {item.operation} </span></a></Link> </td>
        </tr>
        ))}


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

      {prevMockTests &&
                prevMockTests.map((item, i) => (
        <tr key={i}>
          <td>{item.topic_name}</td>
          <td>{item.details}</td>
          <td>{item.status}</td>
          <td><Link href="/"><a className={`table_btn ${item.operation != "Review" ? "continue" : ""}`}><span> {item.operation} </span></a></Link> </td>
        </tr>
        ))}




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
      <Form onSubmit={EditAccount.handleSubmit(onSubmitEditAccount)}>

      <Form.Group controlId="nameID">
                    <Form.Label> Name: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Abdallah Hammad" 
                      {...EditAccount.register("name")} isInvalid={!!EditAccount.formState.errors.name}/>
                    {EditAccount.formState.touchedFields.name && EditAccount.formState.errors.name && (<Form.Control.Feedback type="invalid">{EditAccount.formState.errors.name.message}</Form.Control.Feedback>)}
                  </Form.Group>

                  <Form.Group controlId="emailID">
                  <Form.Label> E-Mail: </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Hralryad@Gmail.Com" 
                    {...EditAccount.register("email")} isInvalid={!!EditAccount.formState.errors.email}/>
                  {EditAccount.formState.touchedFields.email && EditAccount.formState.errors.email && (<Form.Control.Feedback type="invalid">{EditAccount.formState.errors.email.message}</Form.Control.Feedback>)}
                </Form.Group>

                  <Form.Group controlId="mobileID">
                  <Form.Label> Mobile: </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="54 1234567" 
                    {...EditAccount.register("phone")} isInvalid={!!EditAccount.formState.errors.phone}/>
                  {EditAccount.formState.touchedFields.phone && EditAccount.formState.errors.phone && (<Form.Control.Feedback type="invalid">{EditAccount.formState.errors.phone.message}</Form.Control.Feedback>)}
                </Form.Group>



                <div className={form.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!EditAccount.formState.isValid} className={`special_btn ${!EditAccount.formState.isValid ? 'not_valid_btn' : ''}`}> <span> Save </span> </Button>     
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
<Form onSubmit={UpdatePass.handleSubmit(onSubmitUpdatePass)}>

      <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> current password : </Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="********"
            {...UpdatePass.register("password")} isInvalid={!!UpdatePass.formState.errors.password}/>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
          {UpdatePass.formState.touchedFields.password && UpdatePass.formState.errors.password && (<Form.Control.Feedback type="invalid">{UpdatePass.formState.errors.password.message}</Form.Control.Feedback>)}
        </Form.Group>

        <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> new password : </Form.Label>
          <Form.Control
            type={passwordShown2 ? "text" : "password"}
            placeholder="********"
            {...UpdatePass.register("newpassword")} isInvalid={!!UpdatePass.formState.errors.newpassword}/>
          <i onClick={togglePasswordVisiblity2}>{passwordShown2 ? eye : eye_slash}</i>
          {UpdatePass.formState.touchedFields.newpassword && UpdatePass.formState.errors.newpassword  && (<Form.Control.Feedback type="invalid">{UpdatePass.formState.errors.newpassword.message}</Form.Control.Feedback>)}
        </Form.Group>

                <div className={form.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!UpdatePass.formState.isValid} className={`special_btn ${!UpdatePass.formState.isValid ? 'not_valid_btn' : ''}`}> <span> Save </span> </Button>     
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

export default withAuth(Profile);