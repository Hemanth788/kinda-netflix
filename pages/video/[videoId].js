import cls from "classnames";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { getYoutubeVideoById } from "../../lib/videos";
import styles from "../../styles/Video.module.css";
import NavBar from "../../components/nav/navbar.jsx";
Modal.setAppElement("#__next");

export default function Video({ video }) {
  const router = useRouter();
  const videoId = router.query.videoId;
  const {
    title,
    publishTime,
    channelTitle,
    statistics: { viewCount },
    description,
  } = video;
  return (
    <div className={styles.container}>
      <NavBar />
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

export async function getStaticProps({ params }) {
  // const video = {
  //   title: "Hi cute dog",
  //   publishTime: "1990-01-01",
  //   channelTitle: "Paramount Pictures",
  //   viewCount: 100000,
  //   description: ` Heroes don’t get any bigger. Check out the new trailer for Clifford the Big Red Dog, hitting theatres and Paramount+ on November 10. #CliffordMovie`,
  // };
  console.log("params", params);
  const videoId = params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);
  console.log("videoArray", videoArray);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideoIds = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideoIds.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}
