import React from "react";
import styles from "./Partners.module.css";
import { ImageLoader } from "../../../ImageLoader/ImageLoader";

const PartnersList: { imageName: string; id: number }[] = [
  { imageName: "aef.png", id: 0 },
  { imageName: "bta.png", id: 1 },
  { imageName: "embassyEmirates.png", id: 2 },
  { imageName: "evrasia.png", id: 3 },
  { imageName: "far.png", id: 4 },
  { imageName: "giz.png", id: 5 },
  { imageName: "hsbc.png", id: 6 },
  { imageName: "pluralsight.png", id: 7 },
  { imageName: "soc.png", id: 8 },
  { imageName: "zayed.png", id: 9 },
];

const PartnersLoopData = [...PartnersList, ...PartnersList.map((data) => ({ ...data, id: data.id + 100 }))];

export function Partners() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.partnersWrapper} data-partners={PartnersList.length}>
        {PartnersLoopData.map(({ imageName, id }) => {
          return (
            <div className={styles.partnerItem} key={id}>
              <ImageLoader src={`/static/img/partners/${imageName}`} alt={String(id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
