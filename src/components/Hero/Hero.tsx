import styles from "./Hero.module.css";

export function Hero({ header, description }: { header: string; description: string }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{header}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
