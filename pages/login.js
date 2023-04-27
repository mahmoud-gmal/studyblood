import React, { useState } from "react";
import Router from 'next/router'
import Image from "next/image";
import Link from "next/Link";
import Meta from "../src/components/Meta";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup } from 'react-bootstrap';
// styles
import styles from "./../styles/forms/login.module.css";
//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(".البريد الالكتروني مطلوب")
    .email(".البريد إلكتروني غير صالح"),
  password: Yup.string()
    .required(".كلمة المرور مطلوبة")
    .min(8, 'كلمة المرور قصيرة جدًا - يجب ألا تقل عن 8 أحرف.')
    .matches(/[a-zA-Z]/, 'يمكن أن تحتوي كلمة المرور على أحرف لاتينية فقط.'),
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


  const { register,handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = (data) =>{
    console.log(data);
  //   let url = "http://localhost:4000/things/register";
  //   fetch(url, {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(formData)
  //   })
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  //  };

  }




  return (
    <>
      <Meta title="studyblood | login" />
      <main className="main-content">


          <Container>
          <div className={styles.form_wrapper}>
            <h2>
            تسجيل الدخول
            </h2>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>

        <Form.Group controlId="emailID">
          <Form.Label> البريد الإلكترونى </Form.Label>
          <Form.Control
            type="email"
            placeholder="example@test.com" 
            {...register("email")} isInvalid={!!errors.email}/>

{errors.email?.message && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
        </Form.Group>


        <Form.Group className="password_wrap"  controlId="passID">
          <Form.Label> كلمة المرور </Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="كلمة المرور"
            {...register("password")} isInvalid={!!errors.password}/>
          <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eye_slash}</i>
          {errors.password?.message && (<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>)}
        </Form.Group>


        {/* <Form.Group className="mb-3" controlId="formGroupremember">
          <Form.Control type="checkbox"  {...register("rememberme")}/>
          <Form.Label> تذكرنى</Form.Label>
        </Form.Group>    */}

        <Form.Group controlId="remeberID" style={{marginTop: '17px'}}>
        <Form.Check
          className={styles.form_check}
          style={{ display: 'inline-flex', alignItems: 'center'}}
          label="تذكرنى"
          type="checkbox"  {...register("rememberme")}
          // feedback="You must agree before submitting."
          // feedbackType="invalid"
        />
                <Link 
                href="/forget-password"><a className={styles.forget} style={{
                  display: 'inlineBlock',
                  marginRight: 'calc(100% - 174px)'
                }}>هل نسيت كلمة المرور؟</a></Link>
      </Form.Group>
      <div className='' >

      </div>
      <div className='d-flex justify-content-center' style={{marginTop: '25px'}}>

      <Button type="submit" className='special_btn' style={{display: 'block',width: '100%'}}> <span>تسجيل دخول</span> </Button>     
      </div>

            </Form>
             <div className={styles.form_under_text}>
              <span className={styles.or_dashed}>او</span>
              <div className={styles.google_signin}>
              <Link href="/">
                  <a>
                    <Image
                      alt="logo"
                      src="/assets/icons8-google.svg"
                      width="24"
                      height="24"
                      // layout="responsive"
                    />
                    <span>تابع بإستخدام ايميل جوجل</span>

                  </a>
                </Link>
              </div>

             </div>
            </div>
            <div className={styles.form_info}>
            <span>ليس لديك عضوية؟</span>
            <Link href="/signup"><a>سجل حساب جديد</a></Link>
            </div>
          </Container>
     
      </main>

    </>
  );
};

export default Login;


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