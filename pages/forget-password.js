import Router from 'next/router'
import Image from "next/image";
import Link from "next/Link";
import Meta from "../src/components/Meta";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup } from 'react-bootstrap';
// styles
import styles from "./../styles/forms/forget.module.css";

//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(".البريد الالكتروني مطلوب")
    .email(".البريد إلكتروني غير صالح")

});

const Forget = () => {


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
      <Meta title="studyblood | Forget" />
      <main className="main-content">


          <Container>
          <div className={styles.form_wrapper}>
            <h2> نسيت كلمة المرور </h2>
            <p>ادخل البريد الإلكتروني لنقوم بإرسال طريقة استرجاع كلمة المرور من خلاله</p>


       <Form noValidate onSubmit={handleSubmit(onSubmit)}>

        <Form.Group controlId="emailID">
          <Form.Label> البريد الإلكترونى </Form.Label>
          <Form.Control
            type="email"
            placeholder="example@test.com" 
            {...register("email")} isInvalid={!!errors.email}/>
          {errors.email?.message && (<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>)}
        </Form.Group>


      <div className='d-flex justify-content-center' style={{marginTop: '25px'}}>

      <Button type="submit" className='special_btn' style={{display: 'block',width: '100%'}}> <span> إرسال </span> </Button>     
      </div>

            </Form>

            </div>

            <div className={styles.form_info}>
            <span> إذا لم تتمكن من إرجاع كلم مرورك </span>
            <Link href="/contact"><a>إتصل بنا</a></Link>
            </div>
          </Container>
     
      </main>
    </>
  );
};

export default Forget;
