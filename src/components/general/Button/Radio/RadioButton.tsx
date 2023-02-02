import styles from "./RadioButton.module.css";

export function RadioButton({ isActive }: { isActive: boolean }) {
  return (
    <div className={styles.checkboxWrapper}>
      <input className={styles.input} type="radio" checked={isActive} />
      <label className={styles.label}></label>
    </div>
  );
}
