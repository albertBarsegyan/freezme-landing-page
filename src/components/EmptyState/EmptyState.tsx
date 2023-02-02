import { EmptyStateIcon } from "../../icons/EmptyStateIcon";
import styles from "./EmptyState.module.css";

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <EmptyStateIcon />
    </div>
  );
}
