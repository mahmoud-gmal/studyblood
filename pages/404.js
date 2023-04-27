import Image from 'next/image';
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap';
// styles
import styles from "./../styles/pages/404.module.css";

export default function FourOhFour() {
  return <>

    <div className={styles.error_page}>
        <Container>
            <Row>
                <Col md={6}>
                    <div className={styles.text_wrapper}>
                        <h2>لم يتم إيجاد الصفحة</h2>
                        <p>عزرا الصفحة التي تبحث عنها غير متاحة الان بسبب بعض المشاكل التقنية</p>
                        <Link href="/"><a className="special_btn"><span> الرجوع للصفحة الرئيسية </span> </a></Link>
                    </div>
                    
                </Col>
                <Col md={6}>
                    <div className={styles.image_wrapper}>
                    <Image
                                src="/assets/404.png"
                                alt="logo"
                                width="459"
                                height="394"
                                // layout="fill"
                                objectFit="contain"
                                priority
                            />
                    </div>
                </Col>

            </Row>
        </Container>


    </div>

  </>
}