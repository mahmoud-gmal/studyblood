import Meta from "../src/components/Meta";
import Image from "next/image";
import Link from "next/Link";

// styles
import styles from "./../styles/pages/contact.module.css";
// bootstrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone,} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

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
  message: Yup.string()
    .required("Message is required.")


    
});



const Contact = () => {



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {


    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    let url = `${process.env.NEXT_PUBLIC_API_URI}/page/contact`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => 
      {
        if (res.status == 200) {
          toast.success("sent succesfully" ,{}) ;
          reset();

      }else{
        toast.error("There was a problem sending, try again.",{})
      }
      }

      )
      // .then((result) => console.log(result));
  };


  return (
    <>
      <Meta title="studyblood | Contact" />


      <main className={styles.main_content}>



          <Container>
            <Row>

            <Col md={5}>
              <div class="contact_top_info">
              <h3> Contact <span>Us</span></h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
                  <div className={styles.form_wrapper}>
                    <h2>SEND MESSAGE</h2>
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

                <Form.Group controlId="meesageID">
                  <Form.Label>  Message: </Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    placeholder="Your Message" 
                    {...register("message")} isInvalid={!!errors.message}/>
                  {errors.message?.message && (<Form.Control.Feedback type="invalid">{errors.message?.message}</Form.Control.Feedback>)}
                </Form.Group>

                    <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn'> <span> Send </span> </Button>     
                    </div>

                    </Form>
                  </div>
                
              </Col>

            <Col md={7}>


                <div className="ima_wrapper">
                   <Image
                        alt="logo"
                        src="/assets/contact.png"
                        width="748"
                        height="646"
                        layout="responsive"
                        objectFit="cover"
                      />


                </div>
              </Col>




            </Row>
          </Container>
      
      </main>
    </>
  );
};

export default Contact;
