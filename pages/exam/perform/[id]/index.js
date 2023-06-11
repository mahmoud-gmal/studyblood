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


import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight, faBookBookmark, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';





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
  content: Yup.string()
    .required("Field is required.")
});





//conditionally redirect the user based on the response.

// export async function getServerSideProps(context) {
  
//   const  id  = context.query.id || '';




//   // Fetch data from API
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/exam/status/${id}/`);

//   const data = await response.json();

//   // Check the API response and determine the redirect URL
//   let redirectUrl = "";

//   if (data.data.is_ended === 1) {
//     redirectUrl = '/';
//   } 

// return {
//     redirect: {
//       destination: redirectUrl,
//       permanent: false, // Set it to true if the redirect is permanent
//     },
// };
// }







const Perform = () => {

// context
const { token } = useAuth();

const [examStatus, setExamStatus] = useState();


const [loading, setLoading] = useState(true);
const [questions, setQuestions] = useState([]);
const [currentQue, setCurrentQue] = useState([]);
const [activeItem, setActiveItem] = useState(null);


const handleItemClick = (itemId) => {
  setActiveItem(itemId);
};


// // Adding  class to a parent element when a checkbox input is checked
// const [isChecked, setIsChecked] = useState(false);
// function handleCheckboxChange(event) {
//   setIsChecked(event.target.checked);
//   // console.log('jjjjjjjjjjjjj');
// }
// const parentClassName = isChecked ? styles.parent_checked : "";







// Getting Param Id
const router = useRouter()
const { id } = router.query;






useEffect(() => {

// if id is defined
if(id){


// Check Exam Status 
axios.get( 
  `${process.env.NEXT_PUBLIC_API_URI}/exam/status/${id}/`,
  {headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token ? token : localStorage.getItem('token')}`,
          }   
      }
)
.then((response) => {
    // console.log(response.data.data.is_ended);
      setExamStatus(response.data.data.is_ended)
    // setQuestions(response.data.data.score.questions);
    // setLoading(false);
  },
  (error) => {
    console.log(error);
  }
);



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
      }
    ).catch(error => {
      if (error.response.data && error.response.data.status === 403) {
        console.log('error');
        // Redirect to the "Not Found" page
        router.push('/not-found'); 
      } else {
        // Handle other errors
        console.log(error);
      }
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

    }

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
    exam_id: id,
    note: values.content,
    question_id: currentQue.data?.question.id,
  }
  // console.log(formData);
  let url = `${process.env.NEXT_PUBLIC_API_URI}/exam/note`;
  return axios(url, {
            method: "post",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
             },
            data: JSON.stringify(formData)
        })
        .then((response) => {
          // console.log(response.data);
          // AddNote.setValue('content', '');
          AddNote.reset();
          toast.success(`تم الارسال بنجاح`, {});
  
        })
        .catch(error => 
          toast.error(`${error.response.data.message}`, {})
          // console.log(error);
           );
};




// Handling Ending Exam
const handleEndExam = () => {


  const formData = {
    exam_id: id,
  }
// console.log(formData);

let url = `${process.env.NEXT_PUBLIC_API_URI}/exam/end`;
return axios(url, {
          method: "post",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
           },
          data: JSON.stringify(formData)
      })
      .then((response) => {
        console.log(response.data);
        // setQuestions(response.data.data.score.questions);
        // setCurrentQue(response.data);

      })
      .catch(error => 
        // toast.error(`${error.response.data.message}`, {})
        console.log(error)
         );

} 

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

                {currentQue?.data?.is_answered == true &&
                    (<>
                    <div className={styles.ans_items}>

                    {currentQue?.data?.is_correct == 1 ? 
                    (<span className={styles.left_side}><FontAwesomeIcon style={{width:'18px', marginRight: '4px', color: 'green'}} icon={faCheck} /> Correct Answer</span>)
                      
                    : 
                    
                    (<span className={` ${styles.left_side} ${styles.wrong_sign}`}><FontAwesomeIcon style={{width:'18px', marginRight: '4px', color:'rgb(255, 77, 0)'}} icon={faTimes} /> Wrong Answer</span>)
                    }

                      <span className={styles.right_side}>Previous Solutions</span>
                    </div>
                    </>
                    )}


                {currentQue?.data?.is_answered == false &&
               currentQue?.data?.question?.answers.map((item, i) => (
                    <Form.Group className={`mb-3 ${examStatus == 1 ? styles.ended : ''}`} controlId={item.id}  key={item.id} >
                        <Form.Check  type="radio"  value={item.id} name="choice" className={` ${styles.form_check} `}  
                        // label={item.content} 
                        label={
                          <>
                           <span className={styles.checkmark}></span>
                           <span className={styles.content}>{item.content}  </span>
                           <span className={styles.red}></span>
                          </>
                        }
                              {...SubmitAnswer.register("choice")} isInvalid={!!SubmitAnswer.formState.errors.choice}
                              />
                              {SubmitAnswer.formState.touchedFields.choice && SubmitAnswer.formState.errors.choice && (<Form.Control.Feedback type="invalid">{SubmitAnswer.formState.errors.choice.message}</Form.Control.Feedback>)}
                    </Form.Group>
                   ))}

        {currentQue?.data?.is_answered == false && examStatus == 0 &&
                    (<div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" disabled={!SubmitAnswer.formState.isValid} className={`btn_form special_btn ${!SubmitAnswer.formState.isValid ? 'not_valid_btn' : ''}`} > <span> Submit  </span> </Button>     
                    
                    {!currentQue?.data?.next_question_id && 
                    (<Button type="button" style={{float: 'right'}} className={`btn_form special_btn `} onClick={()=> handleEndExam(currentQue.data.question.id)}> <span> End Exam  </span> </Button>) 
                    }


                    </div>)}

                    {currentQue?.data?.is_answered == true &&
                    (<>
                    <uL className={styles.answers}>
                    {
               currentQue?.data?.question?.answers.map((item, i) => (
                      <li key={i} className={`
                      ${ item.is_correct && item.is_chosen ? styles.right_selected : ''} 
                      ${!item.is_correct && item.is_chosen ? styles.wrong : ''}
                      ${item.is_correct ? styles.right : ''}
                      `}
                      > <span>{item.content}</span> <span className={styles.percent}>{item.people_choice_percentage}</span> </li>
                      ))}
                    </uL>
                    
                    </>
                    )}


                </Form>
                   
                </div>
                <div className={styles.hint_wrapp}>

                <p dangerouslySetInnerHTML={{ __html: currentQue?.data?.question?.hint }}></p>
                </div>


                <Form onSubmit={AddNote.handleSubmit(onSubmitAddNote)}  className={`${examStatus == 1 ? styles.ended : ''}`}>
                <Editor
                apiKey="bkyjvt0r5eg3ztub7famuj50yuilhm33coavubjesarybvvc"
                onEditorChange={(content) => AddNote.setValue('content', content)}
                value={''}
                />

                {AddNote.formState.errors.content && <span>{AddNote.formState.errors.content.message}</span>}


                    {examStatus == 0 && (
                       <div className={styles.submit_btn} style={{marginTop: '25px'}}>
                    <Button type="submit" className={`btn_form special_btn `} > <span> Add Notes  </span> </Button>     
                    </div>

                    )}
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
              <div style={{display:'inherit'}}>

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