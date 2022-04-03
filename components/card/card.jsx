import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";
export default function Card(props) {
  const {
    size = "medium",
    imgUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  } = props;
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const handleOnError = () => {
    console.log("error!!!");
    setImgSrc("/static/clifford.webp");
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scaleY: 1.1 }}
        className={cls(classMap[size], styles.imgMotionWrapper)}
      >
        <Image
          src={imgSrc}
          alt="Card image"
          layout="fill"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
}
