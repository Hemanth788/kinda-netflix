import cls from "classnames";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
Modal.setAppElement("#__next");

export default function Video(props) {
  const router = useRouter();
  const videoId = router.query.videoId;
  const video = {};
  const {
    title = "Hi cute dog",
    publishTime = "1990-01-01",
    channelTitle = "Paramount Pictures",
    viewCount = 100000,
    description = ` Heroes don’t get any bigger. Check out the new trailer for Clifford the Big Red Dog, hitting theatres and Paramount+ on November 10. #CliffordMovie
🐾. When middle-schooler Emily Elizabeth (Darby Camp) meets a magical animal rescuer (John Cleese) who gifts her a little, red puppy, she never anticipated waking up to find a giant ten-foot hound in her small New York City apartment. While her single mom (Sienna Guillory) is away for business, Emily and her fun but impulsive uncle Casey (Jack Whitehall) set out on an adventure that will keep you on the edge-of-your-seat as our heroes take a bite out of the Big Apple. Based on the beloved Scholastic book character, Clifford will teach the world how to love big!Heroes don’t get any bigger. Check out the new trailer for Clifford the Big Red Dog, hitting theatres and Paramount+ on November 10. #CliffordMovie
🐾. When middle-schooler Emily Elizabeth (Darby Camp) meets a magical animal rescuer (John Cleese) who gifts her a little, red puppy, she never anticipated waking up to find a giant ten-foot hound in her small New York City apartment. While her single mom (Sienna Guillory) is away for business, Emily and her fun but impulsive uncle Casey (Jack Whitehall) set out on an adventure that will keep you on the edge-of-your-seat as our heroes take a bite out of the Big Apple. Based on the beloved Scholastic book character, Clifford will teach the world how to love big!Heroes don’t get any bigger. Check out the new trailer for Clifford the Big Red Dog, hitting theatres and Paramount+ on November 10. #CliffordMovie
🐾. When middle-schooler Emily Elizabeth (Darby Camp) meets a magical animal rescuer (John Cleese) who gifts her a little, red puppy, she never anticipated waking up to find a giant ten-foot hound in her small New York City apartment. While her single mom (Sienna Guillory) is away for business, Emily and her fun but impulsive uncle Casey (Jack Whitehall) set out on an adventure that will keep you on the edge-of-your-seat as our heroes take a bite out of the Big Apple. Based on the beloved Scholastic book character, Clifford will teach the world how to love big!`,
  } = video;
  return (
    <div className={styles.container}>
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Watch your video"
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="player"
          type="text/html"
          width="100%"
          height="400"
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subTextWrapper, styles.subText)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subTextWrapper, styles.subText)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
