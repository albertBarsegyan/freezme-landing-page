import styles from "./Profile.module.css";
import { ImageLoader } from "../ImageLoader/ImageLoader";
import { LinkedInIcon } from "../../icons/SocialMedia.icon";

export interface Profile {
  id: number;
  imageName: string;
  name: string;
  position: string;
  linkedin?: string;
}

export function ProfileRenderer({ profile, profileImagePath }: { profile: Profile; profileImagePath: string }) {
  return (
    <div key={profile.id} className={styles.teamItemWrapper}>
      <div>
        <ImageLoader
          className={styles.image}
          src={`${profileImagePath}${profile.imageName}`}
          width={150}
          height={150}
          alt={profile.name}
        />
      </div>

      <p className={styles.name}>{profile.name}</p>

      <p className={styles.position}>{profile.position}</p>

      {profile.linkedin && (
        <div className={styles.imageWrapper}>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
        </div>
      )}
    </div>
  );
}
