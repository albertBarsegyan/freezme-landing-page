import styles from "./Team.module.css";
import { Profile, ProfileRenderer } from "../../../ProfileRenderer/ProfileRenderer";

export function Team({
  headerText,
  profileImagePath,
  profiles,
}: {
  headerText: string;
  profileImagePath: string;
  profiles: Profile[];
}) {
  return (
    <div className={styles.wrapper}>
      <div style={{ marginBottom: "2rem" }}>
        <h3 className={styles.teamHeader}>{headerText}</h3>
      </div>
      <div className={styles.teamMemberWrapper}>
        {profiles.map((teamMember) => {
          return <ProfileRenderer profileImagePath={profileImagePath} profile={teamMember} key={teamMember.id} />;
        })}
      </div>
    </div>
  );
}
