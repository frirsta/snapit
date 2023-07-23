import React from "react";
import styles from "../styles/AddImage.module.css";
const AddImage = ({ src, message }) => {
  return (
    <div>
      {src && <img className={styles.AddImage} src={src} alt={message} />}
    </div>
  );
};

export default AddImage;
