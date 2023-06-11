import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './../../styles/pages/LoadingSpinner.module.css';


const Loadingspinner = () => {
    return (
      <div className={styles.overlay}>
        <Loader type="Oval" color="#000000" height={80} width={80} />
      </div>
    );
  };
  
  export default Loadingspinner;