import { useTranslation } from "next-i18next";
import { Story } from "../Story/Story";
import styles from "./StoriesSection.module.css";

const Stories = [
  {
    id: 0,
    img: "karush_nikoyan.jpg",
    name_en_us: "Karush Nikoyan",
    name_hy: "Կարուշ Նիկոյան",
    feedback_hy:
      "GITC գալը կյանքիս լավագույն որոշումներից էր։ Մասնակցել եմ Java  |  Flutter/Dart  6-ամսյա դասընթացին։ Ավարտելուն պես հենց դասախոս Հրանտ Կարպետյանի առաջարկով սկսել եմ կարիերաս VitaNova.live ընկերությունում որպես Flutter developer։\n",
    feedback_en_us:
      "Coming to GITC was one of the best decisions of my life. I participated in their Java | Flutter/Dart 6-month course. As soon as I graduated, I started my career as a Flutter developer at VitaNova.live at the suggestion (OR with the recommendation of) of my lecturer Hrant Karpetyan.",
  },
  {
    id: 1,
    name_en_us: "Alvard Babayan",
    name_hy: "Ալվարդ Բաբայան",
    img: "alvard_babayan.jpg",
    feedback_hy:
      "C++/ Python դասընթացի ավարտից մեկ ամիս անց Local Express-ում ընդունվեցի աշխատանքի։Դեռ դասերի ընթացքում ընդունվել  եմ Synopsys Armenia, որտեղ հարցազրույցի 99%-ը իմացել եմ GITC-ի տված գիտելիքների շնորհիվ։ ",
    feedback_en_us:
      "One month after the completion of the C++/Python course, I got a job at Local Express. While still in class, I was accepted to Synopsys Armenia, where I learned 99% of the job requirements interview thanks to the knowledge provided by GITC.",
  },
  {
    id: 2,
    name_en_us: "Edgar Gharibyan",
    name_hy: "Էդգար Ղարիբյան",
    img: "edgar_gharibyan.jpg",
    feedback_hy:
      "1.5 տարի ինքնակրթությամբ զբաղվելուց հետո որոշեցի կրթությունս վստահել GITC-ին։  JavaScript դասընթացի ավարտին դասախոս Աղասի Գյուրջօղլյանը, ով Annaniks LLC ընկերության տնօրենն է առաջարկեց համագործակցել և այժմ աշխատում եմ որպես #frontend ծրագրավորող։",
    feedback_en_us:
      "After 1.5 years of self-education, I decided to entrust formalize my education with GITC. At the end of the JavaScript course, lecturer Agassi Gyurjoghlyan, who is the director of Annaniks LLC, offered me a collaboration and now I work as a #frontend programmer.",
  },
  {
    id: 3,
    name_en_us: "Anahit Hakobyan",
    name_hy: "Անահիտ Հակոբյան",
    img: "anahit_hakobyan.jpg",
    feedback_hy:
      "GITC գալու հիմնական նպատակը և ակնկալիքը եղել է գործնական գիտելիքներ ձեռք բերելը, այնպիսի մասնագետից, ով  այդ ոլորտում ունի հարուստ փորձ։ Սպասելիքներս ավելի քան արդարացվեցին։ Դասընթացը ավարտելով ընդունվել եմ gHost Services LLC- որպես IT Project Manager։",
    feedback_en_us:
      "The main goal and expectation of coming to GITC was to gain practical knowledge from a specialist who has rich experience in that field. My expectations were more than justified. After completing the course, I joined gHost Services LLC as an IT Project Manager.",
  },
];

export function StoriesSection() {
  const { t: translation } = useTranslation("home");

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.header}>{translation("stories-header")}</p>
        <p className={styles.description}>{translation("stories-description")}</p>
      </div>
      <div className={styles.storyWrapper}>
        {Stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
