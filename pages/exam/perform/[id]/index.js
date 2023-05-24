import { useRouter } from 'next/router';
import { useAuth } from "./../../../../src/context/AuthContext";
// import { server } from '../../../config';
import React, { useState , useEffect, useRef } from "react";

// styles
import styles from "../../../../styles/pages/exam.module.css"
import Meta from '../../../../src/components/Meta'
import Image from "next/image";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// import placholder from './../../../public/assets/images/placeholder.png';
import { Editor } from '@tinymce/tinymce-react';

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

//hook-form & yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema1 = Yup.object().shape({
  choice: Yup.string()
    .required("Field is required.")
    // .min(3, "must be at least 3 characters."),
});

const schema2 = Yup.object().shape({
  editor: Yup.string()
    .required("Field is required.")
});



const Perform = () => {

// context
const { token } = useAuth();



const [loading, setLoading] = useState(true);
const [questions, setQuestions] = useState([]);
const [currentQue, setCurrentQue] = useState([]);
const [answer, setAnswer] = useState([]);
const [activeItem, setActiveItem] = useState(null);


const handleItemClick = (itemId) => {
  setActiveItem(itemId);
};


// Adding  class to a parent element when a checkbox input is checked
const [isChecked, setIsChecked] = useState(false);
function handleCheckboxChange(event) {
  setIsChecked(event.target.checked);
}
const parentClassName = isChecked ? "parent--checked" : "parent";





  function handleEditorChange(content, editor) {
      // console.log('Content was updated:', content);
    }


// Getting Param Id
const router = useRouter()
const { id } = router.query;
// const { asPath } = useRouter();
// console.log(`http://localhost:3000${asPath}`)
// console.log(id); // '/Performs/123'





useEffect(() => {

// Gettting All Questions
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/exam/perform/${id}/`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data.data.score.questions);
        setQuestions(response.data.data.score.questions);
        
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

// que question
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/exam/perform/${id}/`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data);
        setCurrentQue(response.data);
        setActiveItem(response.data.data.question.id);
        // setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );



  }, [id])



// Navigate between questions by question id
function quesGetById (quesId){
  axios.get(
    `${process.env.NEXT_PUBLIC_API_URI}/exam/perform/${id}/${quesId}`,
    {headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
            }   
        }
  )
  .then((response) => {
      // console.log(response.data);
      setCurrentQue(response.data);
    },
    (error) => {
      console.log(error);
    }
  );

}


// Displaying Next Question
function nextQue(nextId){
  // console.log(nextId);
  if(nextId){

    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/exam/perform/${id}/${nextId}`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data);
        setCurrentQue(response.data);
        setActiveItem(nextId);
      },
      (error) => {
        console.log(error);
      }
    );

  }


}

// Displaying Prev Question
function prevQue(prevId){
  // console.log(prevId);
  if(prevId){
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/exam/perform/${id}/${prevId}`,
      {headers: {
              "Content-type": "Application/json",
              "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
              }   
          }
    )
    .then((response) => {
        // console.log(response.data);
        setCurrentQue(response.data);
        setActiveItem(prevId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}



const SubmitAnswer = useForm({
  resolver: yupResolver(schema1),
  mode: 'onTouched', // enable "on touch" validation
  // defaultValues,
  // defaultValues: { input1: '', input2: '' },
});


const AddNote = useForm({
  resolver: yupResolver(schema2),
  mode: 'onTouched', // enable "on touch" validation
  // defaultValues: { input1: '', input2: '' },
});


// Submitting Answer
const onSubmitSubmitAnswer = async (values) => {

  const formData = {
    exam_id: id,
    question_id: currentQue.data?.question.id,
    user_answer_id: values.choice,
  }
// console.log(formData);

let url = `${process.env.NEXT_PUBLIC_API_URI}/exam/answer`;
return axios(url, {
          method: "post",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
           },
          data: JSON.stringify(formData)
      })
      .then((response) => {
        console.log(response.data.data.question.answers[0]);
        setAnswer(response.data.data.question);
        setQuestions(response.data.data.score.questions);
        setCurrentQue(response.data);

      })
      .catch(error => 
        // toast.error(`${error.response.data.message}`, {})
        console.log(error)
         );


};



const onSubmitAddNote = async (values) => {
  const formData = {
    current_password: values.password,
    new_password: values.newpassword,
  }

};





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
                    <Button className={`btn_arrow ${styles.btn_prev} ${currentQue?.data?.previous_question_id ? 'active_foun' : 'not_foun'}`} onClick={()=> prevQue(currentQue?.data?.previous_question_id)}>  <FontAwesomeIcon style={{width:'12px', marginRight: '7px'}} icon={faArrowLeft} />  Previous</Button>
                     <h2> {currentQue.message} </h2>
                    <Button className={`btn_arrow ${styles.btn_prev} ${currentQue?.data?.next_question_id ? 'active_foun' : 'not_foun'}`} onClick={()=> nextQue(currentQue.data.next_question_id)}>Next <FontAwesomeIcon style={{width:'12px', marginLeft: '7px'}} icon={faArrowRight} /></Button>
                </div>
             <div className='ques_block'>
              <div className={styles.form_sec_first}>
                <div className={styles.que_txt}>
                 {currentQue.data?.question.content}
                </div>
                <Form onSubmit={SubmitAnswer.handleSubmit(onSubmitSubmitAnswer)} className={styles.choices}>

                {currentQue?.data?.question?.answers &&
               currentQue?.data?.question?.answers.map((item, i) => (
                    <Form.Group className={`mb-3 `} controlId={item.id}  key={item.id} >
                        <Form.Check  type="radio" value={item.id} name="choice" className={` ${styles.form_check}`}  label={item.content} 
                              {...SubmitAnswer.register("choice")} isInvalid={!!SubmitAnswer.formState.errors.choice}/>
                              {SubmitAnswer.formState.touchedFields.choice && SubmitAnswer.formState.errors.choice && (<Form.Control.Feedback type="invalid">{SubmitAnswer.formState.errors.choice.message}</Form.Control.Feedback>)}
                    </Form.Group>
                   ))}

                    <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!SubmitAnswer.formState.isValid} className={`special_btn ${!SubmitAnswer.formState.isValid ? 'not_valid_btn' : ''}`} > <span> Submit  </span> </Button>     
                    </div>


                </Form>
                </div>


                <Form onSubmit={AddNote.handleSubmit(onSubmitAddNote)}  className='notes'>
                <Editor 
                    apiKey="bkyjvt0r5eg3ztub7famuj50yuilhm33coavubjesarybvvc"
                    // initialValue="<p>This is the initial content.</p>"
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
                    onEditorChange={(content) => {
                    AddNote.register("editor")
                    }}/>
                    
                       <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!AddNote.formState.isValid} className={`special_btn ${!AddNote.formState.isValid ? 'not_valid_btn' : ''}`} > <span> Add Notes  </span> </Button>     
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
                    <div className={styles.item} dangerouslySetInnerHTML={{ __html: currentQue.data?.question.links ? currentQue.data?.question.links : "<p>Not Found</p>"}}></div>
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
                <h5 className={styles.score_total}>{currentQue?.data?.score.percentage } %</h5>
            </div>
            <table className={styles.score_table}>
            <tbody>

              {loading && (<tr><td>loading......</td></tr>)}
                  {questions &&
                questions.map((item, i) => (
              <tr key={i} onClick={() => handleItemClick(item.id)}>
                <td className={`${styles.nav_table} ${activeItem === item.id ? styles.active : ''}`} onClick={() => quesGetById(item.id)}>{i + 1}</td>
                <td>
                  {item.is_correct === 1 ?  (<><div className={styles.true}></div></>) : item.is_correct === 0 ? ( <><div className={styles.false}>X</div></>) : 
                  ( <><div className={styles.dashed}></div></>)
                  }
                  </td>
              </tr>
              ))}



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







export default Perform