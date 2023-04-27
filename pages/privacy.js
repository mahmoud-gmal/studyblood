import Meta from "../src/components/Meta";

// styles
import styles from "./../styles/pages/privacy.module.css";

const privacy = () => {
  return (
    <>
      <Meta title="studyblood | Privacy" />


      <main className={styles.main_content}>

         <h2 className={styles.heading}>الشروط والأحكام</h2>


        <section className={styles.privacy_section}>
            <h3 className={styles.sub_heading}>شروط الإنضمام</h3>
            <ul className={styles.list_dots}>
              <li>لا يقل عمر الطفل عن 4 سنوات ولا يزيد عن 6 سنوات</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
            </ul>

            <span className={styles.dashed_line}></span>
            <h3 className={styles.sub_heading}>شروط الموقع</h3>
            <ul className={styles.list_dots}>
              <li>لا يقل عمر الطفل عن 4 سنوات ولا يزيد عن 6 سنوات</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
            </ul>

            <span className={styles.dashed_line}></span>
            <h3 className={styles.sub_heading}>شروط أولياء الامور</h3>
            <ul className={styles.list_dots}>
              <li>لا يقل عمر الطفل عن 4 سنوات ولا يزيد عن 6 سنوات</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
              <li>هنا تكتب الشروط الواجب توفرها في الطالب للإنضمام</li>
            </ul>

        </section>
      </main>
    </>
  );
};

export default privacy;
