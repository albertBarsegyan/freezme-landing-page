import { ReactNode } from "react";
import styles from "./Features.module.css";
import { PeopleConversationIcon, PeopleIcon, RadarIcon, RightArrowIcon, TimeIcon } from "../../icons/Features.icons";
import { ComponentLayout } from "../Layouts/ComponentLayout/ComponentLayout";

export function FeatureIconWrapper({ icon }: { icon: ReactNode }) {
  return <div className={styles.iconWrapper}>{icon}</div>;
}

export const features = [
  {
    id: 0,
    icon: <TimeIcon />,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    icon: <RightArrowIcon />,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    icon: <RadarIcon />,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 4,
    icon: <PeopleConversationIcon />,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

export const Feature = ({ icon, description }: { icon: JSX.Element; description: string }) => {
  return (
    <div className={styles.featureBlock}>
      <div>{icon}</div>

      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
};

export function Features() {
  return (
    <ComponentLayout>
      <div className={styles.featuresWrapper}>
        {features.map(({ icon, description, id }) => (
          <Feature key={id} icon={icon} description={description} />
        ))}
      </div>
    </ComponentLayout>
  );
}
