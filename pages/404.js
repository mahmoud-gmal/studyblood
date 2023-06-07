import Image from 'next/image';
import Link from 'next/Link'
import { Col, Container, Row } from 'react-bootstrap';
// styles
import styles from "./../styles/pages/404.module.css";
import Meta from '../src/components/Meta';

export default function FourOhFour() {
  return <>
<Meta title="StudyBlood | Page Not Found" />
    <div className={styles.error_page}>
        <Container>
            <Row>
                {/* <Col md={6}>
                    <div className={styles.text_wrapper}>
                        <h2>Page not found</h2>
                        <p>Sorry, the page you are looking for is not available now due to some technical problems.</p>  

                        <Link href="/"><a className="special_btn"><span> Back to Home </span> </a></Link>
                    </div>
                    
                </Col> */}
                <Col md={12}>
                    <div className={styles.image_wrapper}>
                    <Image
                                src="/assets/404.png"
                                alt="logo"
                                width="600"
                                height="494"
                                // layout="fill"
                                objectFit="cover"
                                priority
                            />
                            
                    </div>
                    <Link href="/"><a className="special_btn"><span> Back to Home </span> </a></Link>
                </Col>

            </Row>
        </Container>


    </div>

  </>
}