import styles from "./Story.module.css";
import { useRouter } from "next/router";
import { getDataByLocale } from "../../../../utils/object.utils";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";

interface Story {
  id: number;
  name_en_us: string;
  name_hy: string;
  img: string;
  feedback_hy: string;
  feedback_en_us: string;
}

export function Story({ story }: { story: Story }) {
  const { locale } = useRouter();
  const name = getDataByLocale({ locale, object: story, field: "name" });
  const feedback = getDataByLocale({ locale, object: story, field: "feedback" });

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <ImageLoader
          className={styles.image}
          width={32}
          height={32}
          src={`/static/img/students/${story.img}`}
          alt={story.img}
        />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.storyWrapper}>
        <p className={styles.story}>{feedback}</p>
      </div>
    </div>
  );
}
