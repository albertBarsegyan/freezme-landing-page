import styles from "./Coursepresenter.module.css";

export function CoursePresenter({ headerText, descriptionText }: { headerText: string; descriptionText: string }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>{headerText}</p>
      <p className={styles.description}>{descriptionText}</p>
    </div>
  );
}
