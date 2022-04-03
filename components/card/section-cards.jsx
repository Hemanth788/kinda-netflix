import Card from "./card";
import styles from "./section-cards.module.css";
export default function SectionCards(props) {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos &&
          videos.map((item, index) => (
            <Card id={index} key={index} imgUrl={item.imgUrl} size={size} />
          ))}
      </div>
    </section>
  );
}
