import styles from "./Trainers.module.css";
import { useTranslation } from "next-i18next";
import { Profile, ProfileRenderer } from "../../../ProfileRenderer/ProfileRenderer";

const TrainersInfo: Profile[] = [
  {
    id: 1,
    imageName: "amalya_exoyan.jpg",
    name: "Amalya Yeghoyan",
    position: "Executive Director",
    linkedin: "https://www.linkedin.com/in/amalya-yeghoyan-a045ba33/",
  },
  {
    id: 2,
    imageName: "anna_arzumanyan.jpg",
    name: "Anna Arzumanyan",
    position: "Journalist/Copywriter",
    linkedin: "https://www.linkedin.com/in/annaarzumanyan/",
  },

  {
    id: 3,
    imageName: "aram_saloyan.jpg",
    name: "Aram Saloyan",
    position: "Contract Photographer",
    linkedin: "https://www.linkedin.com/in/photographyaram/",
  },
  {
    id: 4,
    imageName: "arman_mkrtchyan.jpg",
    name: "Arman Mkrtchyan",
    position: "Executive Director",
    linkedin: "https://www.linkedin.com/in/arman-mkrtchyan-76694b1b9/",
  },
  {
    id: 5,
    imageName: "babken_tovmasyan.jpg",
    name: "Babken Tovmasyan",
    position: "Program manager",
    linkedin: "https://www.linkedin.com/in/babken-tovmasyan-3ab231248/",
  },

  {
    id: 6,
    imageName: "edgar_chilingaryan.jpg",
    name: "Edgar Chilingaryan",
    position: "Founder and CEO of A’EYE",
    linkedin: "https://www.linkedin.com/in/edgar-chilingaryan-421a5663/",
  },
  {
    id: 7,
    imageName: "levon_hayrapetyan.jpg",
    name: "Levon Hayrapetyan",
    position: "Graphic Designer",
    linkedin: "https://www.linkedin.com/in/levon-hayrapetyan-36a8a9243/",
  },
  {
    id: 8,
    imageName: "mane_gevorgyan.jpg",
    name: "Mane Gevorgyan",
    position: "Program manager",
    linkedin: "https://www.linkedin.com/in/maneh-gevorgyan/",
  },
];

export function Trainers() {
  const { t: translation } = useTranslation("about");

  return (
    <div className={styles.mediaInfoWrapper}>
      <div className={styles.mediaContentWrapper}>
        <div className={styles.mediaTextWrapper}>
          <h4 className={styles.mediaHeader}>{translation("trainer-info-title")}</h4>

          <p className={styles.mediaDescription}>{translation("trainer-info-description")}</p>
        </div>
      </div>

      <div className={styles.mediaProjectsWrapper}>
        {TrainersInfo.map((trainerProfile) => (
          <ProfileRenderer profileImagePath={"/static/img/trainer/"} profile={trainerProfile} key={trainerProfile.id} />
        ))}
      </div>
    </div>
  );
}
