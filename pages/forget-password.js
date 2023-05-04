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
    .required("Email is required.")
    .email("Invalid email."),
});

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faBackward, faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />


const Forget = () => {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const { forgetPass } = useAuth();


  const { register,reset, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit =  async (values) =>{

    const formData = {
      email: values.email,
    }
    try {
      await forgetPass(formData);
      
      // history.push("/");
    } catch (error) {
      // console.log('page error');
      console.log(error);
    }


  }




  return (
    <>
      <Meta title="studyblood | login" />
      <main className={styles.main_content}>


          <Container>
          <div className={styles.form_wrapper}>
            <div className={styles.back_btn}>  <FontAwesomeIcon icon={faChevronLeft} /> <Link href="/login">Back</Link></div>
          <h3> RECOVER <span>PASSWORD</span></h3>
          <p>To Recover Your Password, Enter The E-Mail</p>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>

        <Form.Group controlId="emailID">
          <Form.Label> E-Mail: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Hralryad@Gmail.Com" 
            {...register("email")} isInvalid={!!errors.email}/>

{errors.email?.message && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
        </Form.Group>


                <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn'> <span> Send E-Mail </span> </Button>     
                    </div>

            </Form>

            </div>

          </Container>
     
      </main>

    </>
  );
};

export default Forget;


{/* <div className="row justify-content-center">
<div className="col-md-7">
  <div className="contact-inner">
    <div className="contact-form">
      <h3>Login </h3>
      <form onSubmit={submitHandler}>
        <FormGroup controlId='emailID'>
          <label>Username</label>
          <input type="text" name="username" className="form-control" ref={usernameRef} required/>
        </FormGroup>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" ref={passwordRef} autoComplete="on" required/>
        </div>
        <div className="form-group">
          <div className="row">
              <div className="col-6">
                  <label className="aiz-checkbox">
                      <input type="checkbox" name="remember" />
                      <span className="text-muted ml-2">Remember Me</span>
                      <span className="aiz-square-check"></span>
                  </label>
              </div>
              <div className="col-6 text-right">
                  <Link href="/forget-password" className="text-muted">Forgot password?</Link>
              </div>
          </div>
         </div>
        <div className="form-group wrap-btn">
          <button type="submit" className="btn btn-form" style={{minWidth: '100%',marginBottom: '18px'}}>
            <span>Login</span>
          </button>
        </div>

        <div className="form-group text-center">
          <p className="text-muted" style={{fontSize:'16px'}}>Dont have an account?</p>
          <Link href="/signup">Register Now</Link>
        </div>

      </form>
    </div>
  </div>
</div>

</div> */}