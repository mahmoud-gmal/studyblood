import { useRouter } from 'next/router';
// import { server } from '../../../config';
import React, { useState , useEffect, useRef } from "react";

// styles
import styles from "../../../../styles/pages/exam.module.css"
import Meta from '../../../../src/components/Meta'
import Image from "next/image";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// import placholder from './../../../public/assets/images/placeholder.png';
import { Editor } from '@tinymce/tinymce-react';




// import "react-intl-tel-input/dist/main.css";
// import PhoneInput from "react-intl-tel-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Perform = () => {



    const [phoneNumber, setPhoneNumber] = useState("");
    const handlePhoneNumberChange = (value) => {
      setPhoneNumber(value);
    };





    function handleEditorChange(content, editor) {
        console.log('Content was updated:', content);
      }

    const router = useRouter()
    const { id } = router.query;


// const { asPath } = useRouter();
// console.log(`http://localhost:3000${asPath}`)


  console.log(id); // '/Performs/123'

// console.log(slug)
// if(!Perform){
//     return(
//         <h2>NOT FOUND !</h2>
//     )
// }


  return (
    <>
      <Meta title="studyblood | Exam | Perform" />
      {/* <div>
      <p>ID: {id}</p>
    </div> */}

<main className="main-content">

<div className={`page_content ${styles.about}`}>

    <Container>


          <Row>
            <Col md={7}> 
            <div className='ques_wrapper'>
                <div className={styles.header_ques}>
                    <Button className={`btn_arrow ${styles.btn_prev}`}>  <FontAwesomeIcon style={{width:'12px', marginRight: '7px'}} icon={faArrowLeft} />  Previous</Button>
                     <h2> Question 1 of 30 </h2>
                    <Button className={`btn_arrow ${styles.btn_prev}`}>Next <FontAwesomeIcon style={{width:'12px', marginLeft: '7px'}} icon={faArrowRight} /></Button>
                </div>
             <div className='ques_block'>
              <div className={styles.form_sec_first}>
                <div className={styles.que_txt}>
                a 62-year-old male is currently admitted to the hospital for anemia due to bleeding. the patient was recently found to have cholecystitis. he was taken for a cholecystectomy. on pod#1, the patient developed worsening right-sided purpura near his abdomen. is hemoglobin was drawn and it was found to be 6.2 g/dl, which was done from a preoperative level of 12 g/dl. imaging is performed and he was found to have a large retroperitoneal bleed. he was surgically explored and the bleeding vessel that was causing the bleeding was fixed. hematology is consulted as the patient needs several prbc transfusions but the patient carries a history of iga deficiency. how should the prbc be modified to ensure that he receives a safe transfusion?
                </div>
                <Form className={styles.choices}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check  className={styles.form_check} type="checkbox" label="A. No specific intervention needed. IgA deficiency poses no risk for the patient to receive pRBC transfusions" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check  className={styles.form_check}type="checkbox" label="B. No specific intervention needed. IgA deficiency poses no risk for the patient to receive pRBC transfusions" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check  className={styles.form_check} type="checkbox" label="C. No specific intervention needed. IgA deficiency poses no risk for the patient to receive pRBC transfusions" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check className={styles.form_check} type="checkbox" label="D. No specific intervention needed. IgA deficiency poses no risk for the patient to receive pRBC transfusions" />
                    </Form.Group>

                    <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn' > <span> Submit  </span> </Button>     
                    </div>
                </Form>
                </div>


                <Form className='notes'>
                <Editor
                    apiKey="bkyjvt0r5eg3ztub7famuj50yuilhm33coavubjesarybvvc"
                    initialValue="<p>This is the initial content.</p>"
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                        ],
                        toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                    }}
                    onEditorChange={handleEditorChange}
                    />
                       <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className='special_btn' > <span> Add Notes  </span> </Button>     
                    </div>
                </Form>



             </div>

            </div>
            </Col>
            <Col md={3}> 
            <div className='ref'>
              <div className={styles.ref_heading}>
                  <Image
                    alt="logo"
                    src="/assets/literature.svg"
                    width="33"
                    height="24"
                    // layout="responsive"
                    // objectFit="cover"
                    />
                  <h5>Reference Ranges</h5>
              </div>
                  <div className={styles.ref_items}>
                    <div className={styles.item}>
                        <h4>Haemoglobin</h4>
                        <p>Men: 135-180 g/L </p>
                        <p>Women: 115-160 g/L</p>
                    </div>
                  </div>
            </div>
            </Col>
            <Col md={2}> 
            <div className={styles.ref_heading}>
                 <Image
                    alt="logo"
                    src="/assets/literature.svg"
                    width="33"
                    height="24"
                    // layout="responsive"
                    // objectFit="cover"
                    />
                
                <h5>Score</h5>
            </div>
            <table className={styles.score_table}>
            <tbody>
              <tr>
                <td className={`${styles.nav_table} ${styles.active}`}>1</td>
                <td> <div className={styles.true}></div></td>
              </tr>
              <tr>
                <td className={styles.nav_table}>2</td>
                <td><div className={styles.false}>X</div></td>
              </tr>
              <tr>
                <td className={styles.nav_table}>3</td>
                <td> <div className={styles.true}></div></td>
              </tr>
              <tr>
                <td className={styles.nav_table}>4</td>
                <td><div className={styles.false}>X</div></td>
              </tr>
              </tbody>
            </table>

            </Col>
          </Row>
   

  </Container>

</div>

</main>

    </>
  )
}

// export const getStaticProps = async (context) => {
//   const res = await fetch(`https://safwa-tech.com/wp-json/wp/v2/Perform/${context.params.id}`)

//   const Perform = await res.json()

//   return {
//     props: {
//       Perform,
//       revalidate : 1  //In seconds
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch('https://safwa-tech.com/wp-json/wp/v2/Perform')

//   const Performs = await res.json()
//   const paths = Performs.map(Perform => ({ params: { id: Perform?.id.toString() } }));
//   // const paths = Performs.map(Perform => ({ params: { id: '344' } }));


//   return {
//     paths,
//     fallback: true,
//   }
// }





export default Perform