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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail is required.")
    .email("E-mail field must be a valid email."),
  password: Yup.string()
    .required(".Password is required")
    .min(8, 'Password is too short - must be at least 8 characters long.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin characters.'),
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />


const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const { login } = useAuth();

  const { register,handleSubmit, formState: { errors, isValid, touchedFields }} = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched', // enable "on touch" validation
  });


  const onSubmit =  async (values) =>{

    const formData = {
      email: values.email,
      password: values.password,
    }
    try {
      await login(formData);
      // history.push("/");
    } catch (error) {
      console.log('page error');
      console.log(error);
    }


  }




  return (
    <>
      <Meta title="studyblood | login" />
      <main className={styles.main_content}>


          <Container>
          <div className={styles.form_wrapper}>
          <h3> LOG <span>IN</span></h3>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>

        <Form.Group controlId="emailID">
          <Form.Label> E-Mail: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Hralryad@Gmail.Com" 
            {...register("email")} isInvalid={!!errors.email}/>

{  touchedFields.email && errors.email && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
        </Form.Group>


        <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> Password : </Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="********"
            {...register("password")} isInvalid={!!errors.password}/>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
          {touchedFields.password && errors.password && (<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>)}
        </Form.Group>


        <Form.Group controlId="remeberID" style={{marginTop: '17px'}}>
        <Form.Check
          className={styles.form_check}
          label="Remember Me"
          type="checkbox"  {...register("rememberme")}
        />
                <Link href="/forget-password"><a className={styles.forget} > Forget Password </a></Link>
      </Form.Group>

                <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!isValid} className={`btn_form special_btn ${!isValid ? 'not_valid_btn' : ''}`}> <span> Log In </span> </Button>     
                    </div>

            </Form>

            </div>
            <div className={styles.form_info}>
            <Link href="/signup"><a> Create An Account</a></Link>
            </div>
          </Container>
     
      </main>

    </>
  );
};

export default Login;


