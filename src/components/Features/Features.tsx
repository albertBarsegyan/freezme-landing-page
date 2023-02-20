import styles from "./Features.module.css";
import { PeopleConversationIcon, PeopleIcon, RightArrowIcon, TimeIcon } from "../../icons/Features.icons";
import { ComponentLayout } from "../Layouts/ComponentLayout/ComponentLayout";
import { RoutePath } from "../../constants/route.constants";

export const features = [
  {
    id: 0,
    icon: <TimeIcon />,
    description:
      "The ability to look back on important moments and memories at a designated time can bring great joy and a sense of anticipation.",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    description:
      "FREEZME offers an opportunity to add context to the media being frozen. Users can add captions, comments, or even voice recordings to each photo or video, which can then be revealed alongside the media on the designated date.\n",
  },
  {
    id: 2,
    icon: <RightArrowIcon />,
    description:
      "FREEZME offers a level of personalization that is hard to match. This allows for a wide range of possibilities - from freezing photos of a newborn baby and revealing them on their first birthday, to freezing a picture of a loved one on their anniversary and revealing it on their next milestone celebration.",
  },
  // {
  //   id: 3,
  //   icon: <RadarIcon />,
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  // },
  {
    id: 4,
    icon: <PeopleConversationIcon />,
    description:
      "By freezing memorable moments and reliving them, application creates a unique album with most precious photos and videos.",
  },
];

export const Feature = ({ icon, description }: { icon: JSX.Element; description: string }) => {
  return (
    <div className={styles.featureBlock}>
      <div className={styles.featureBlockIconWrapper}>{icon}</div>

      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
};

export function Features() {
  return (
    <ComponentLayout id={RoutePath.features().replace("/", "")}>
      <div className={styles.featuresWrapper}>
        {features.map(({ icon, description, id }) => (
          <Feature key={id} icon={icon} description={description} />
        ))}
      </div>
    </ComponentLayout>
  );
}
