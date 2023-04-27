import React, { useState } from "react";
import Router from 'next/router'
import Image from "next/image";
import Link from "next/Link";
import Meta from "../src/components/Meta";
import { toast } from "react-toastify";
import { Button, Container, Form } from 'react-bootstrap';
// styles
import styles from "./../styles/forms/signup.module.css";
//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// validate phone number with reg expression
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(".الاسم مطلوب")
    .min(3, "يجب ألا يقل عن 3 أحرف"),
  email: Yup.string()
    .required(".البريد الالكتروني مطلوب")
    .email(".البريد إلكتروني غير صالح"),
  phoneNumber: Yup.string()
    .required(".رقم الجوال مطلوب")
    .matches(phoneRegExp, 'رقم الجوال غير صالح'),
  password: Yup.string()
    .required(".كلمة المرور مطلوبة")
    .min(8, 'كلمة المرور قصيرة جدًا - يجب ألا تقل عن 8 أحرف.')
    .matches(/[a-zA-Z]/, 'يمكن أن تحتوي كلمة المرور على أحرف لاتينية فقط.'),
    conditions: Yup.bool()
    .oneOf([true], 'يجب الموافقة على الشروط والاحكام'),

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
      <Meta title="studyblood | Signup" />
      <main className="main-content">
          <Container>
          <div className={styles.form_wrapper}>
            <h2>
            إنشاء حساب
            </h2>

            <Form noValidate onSubmit={handleSubmit(onSubmit)}>

              <Form.Group controlId="nameID">
                <Form.Label> الاسم </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="الاسم" 
                  {...register("name")} isInvalid={!!errors.name}/>
                {errors.name?.message && (<Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>)}
              </Form.Group>

            <Form.Group controlId="emailID">
              <Form.Label> البريد الإلكترونى </Form.Label>
              <Form.Control
                type="email"
                placeholder="example@test.com" 
                {...register("email")} isInvalid={!!errors.email}/>
              {errors.email?.message && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
            </Form.Group>

              <Form.Group controlId="emailID">
                <Form.Label>  رقم الجوال </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="رقم الجوال " 
                  {...register("phoneNumber")} isInvalid={!!errors.phoneNumber}/> 
                {errors.phoneNumber?.message && (<Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>)}
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

              <Form.Group controlId="remeberID" style={{marginTop: '17px'}}>
              <Form.Check
                className={styles.form_check}
                style={{ display: 'inline-flex', alignItems: 'center'}}
                {...register("conditions")} isInvalid={!!errors.conditions}/>
              <Form.Label className="agree_condtion"> اوافق على  <Link href="/conditions"><a> شروط واحكام </a></Link>اكاديمية منصة احرف</Form.Label>
              {errors.conditions?.message && (<Form.Control.Feedback type="invalid">{errors.conditions?.message}</Form.Control.Feedback>)}
            </Form.Group>
            

      <div className='d-flex justify-content-center' style={{marginTop: '25px'}}>
        <Button type="submit" className='special_btn' style={{display: 'block',width: '100%'}}> <span> إنشاء حساب </span> </Button>     
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
            <span>ليس لديك حساب</span>
            <Link href="/login"><a> سجل دخول الان</a></Link>
            </div>

          </Container>
      </main>
    </>
  );
};

export default Signup;

