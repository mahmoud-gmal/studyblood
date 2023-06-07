import React, { useState } from "react";
import { useAuth } from "./../src/context/AuthContext";
import Router from 'next/router'
import Image from "next/image";
import Link from "next/Link";
import Meta from "../src/components/Meta";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup } from 'react-bootstrap';
// styles
import styles from "./../styles/pages/form.module.css";
//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "must be at least 3 characters."),
  email: Yup.string()
    .required("E-mail is required.")
    .email("E-mail field must be a valid email."),
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(phoneRegExp, 'Phone number is not valid'),  
  password: Yup.string()
    .required("Password is required.")
    .min(8, 'Password is too short - must be at least 8 characters long.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin characters.'),
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />


const Signup = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const { signup } = useAuth();


  const { register,handleSubmit, formState: { errors, isValid, touchedFields   }} = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched', // enable "on touch" validation
  });


  const onSubmit =  async (values) =>{

    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone
    }

    try {
      await signup(formData);
      // history.push("/");
    } catch (error) {
      console.log('page error');
      console.log(error);
    }


  }








  return (
    <>
      <Meta title="studyblood | Sign Up" />
      <main className={styles.main_content}>

          <Container>
          <div className={styles.form_wrapper}>
              <h3> SIGN <span>UP</span></h3>
            <p>Already Have An Account ? <Link href="/login"><a className={styles.log} > Log In </a></Link></p>
              <Form noValidate onSubmit={handleSubmit(onSubmit)}>

                  <Form.Group controlId="nameID">
                    <Form.Label> Name: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type Name" 
                      {...register("name")} isInvalid={!!errors.name}/>
                    {touchedFields.name && errors.name && (<Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>)}
                  </Form.Group>
                  
                <Form.Group controlId="emailID">
                  <Form.Label> E-Mail: </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Hralryad@Gmail.Com" 
                    {...register("email")} isInvalid={!!errors.email}/>

                    {touchedFields.email && errors.email && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
                </Form.Group>

                <Form.Group controlId="mobileID">
                  <Form.Label> Mobile: </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="54 1234567" 
                    {...register("phone")} isInvalid={!!errors.phone}/>
                  {touchedFields.phone && errors.phone && (<Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>)}
                </Form.Group>

              <Form.Group className="password_wrap"  controlId="passID">
                <Form.Label> Password : </Form.Label>
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  placeholder="********"
                  {...register("password")} isInvalid={!!errors.password}/>
                <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
                {touchedFields.password &&  errors.password && (<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>)}
              </Form.Group>

                <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!isValid} className={`btn_form special_btn ${!isValid ? 'not_valid_btn' : ''}`}> <span> Sign Up </span> </Button>     
                </div>

            </Form>

            </div>
          </Container>
     
      </main>

    </>
  );
};

export default Signup;


