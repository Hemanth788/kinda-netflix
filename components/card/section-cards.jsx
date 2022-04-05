import Card from "./card";
import styles from "./section-cards.module.css";
import Link from "next/link";
export default function SectionCards(props) {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos &&
          videos.map((item, index) => (
            // <Link key={index} href={`/video/${videoId}`} passHref={true}>
            <Card id={index} imgUrl={item.imgUrl} size={size} />
            // </Link>
          ))}
      </div>
    </section>
  );
}
