import { FacebookIcon, InstagramIcon, LinkedInIcon } from "../../icons/SocialMedia.icon";

import styles from "./SocialMedia.module.css";

const SocialMediaLinks = [
  {
    content: <LinkedInIcon />,
    path: "https://www.linkedin.com/company/gitc-gyumri-information-technologies-center/mycompany/\n",
  },

  {
    content: <InstagramIcon />,
    path: "https://www.instagram.com/gitc_it/\n",
  },
  {
    content: <FacebookIcon />,
    path: "https://www.facebook.com/gyumri.gtech",
  },
];

export function SocialMedia() {
  return (
    <div className={styles.wrapper}>
      {SocialMediaLinks.map((socialMediaLink) => {
        return (
          <a key={socialMediaLink.path} href={socialMediaLink.path} target="_blank" rel="noreferrer">
            {socialMediaLink.content}
          </a>
        );
      })}
    </div>
  );
}
