import styles from "./Faq.module.css";
import { Accordion } from "../Accordion/Accordion";

const Faqs = [
  {
    key: 0,
    question: "Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor",
    answer:
      "Vim mediocrem voluptatum ut, no aperiri apeirian constituto his. Nec modo illum aperiri ex. Sit sumo pertinax ea, ea vel eros semper accusam. Est ad timeam dissentias, eu harum dictas est.",
  },
  {
    key: 1,
    question: "Lorem ipsum dolor",
    answer:
      "Vim mediocrem voluptatum ut, no aperiri apeirian constituto his. Nec modo illum aperiri ex. Sit sumo pertinax ea, ea vel eros semper accusam. Est ad timeam dissentias, eu harum dictas est.",
  },
  {
    key: 2,
    question: "Lorem ipsum dolor",
    answer:
      "Vim mediocrem voluptatum ut, no aperiri apeirian constituto his. Nec modo illum aperiri ex. Sit sumo pertinax ea, ea vel eros semper accusam. Est ad timeam dissentias, eu harum dictas est.",
  },
  {
    key: 3,
    question: "Lorem ipsum dolor",
    answer:
      "Vim mediocrem voluptatum ut, no aperiri apeirian constituto his. Nec modo illum aperiri ex. Sit sumo pertinax ea, ea vel eros semper accusam. Est ad timeam dissentias, eu harum dictas est.",
  },
  {
    key: 4,
    question: "Lorem ipsum dolor",
    answer:
      "Vim mediocrem voluptatum ut, no aperiri apeirian constituto his. Nec modo illum aperiri ex. Sit sumo pertinax ea, ea vel eros semper accusam. Est ad timeam dissentias, eu harum dictas est.",
  },
];

export function Faq() {
  return (
    <div className={styles.faqsContainerWrapper}>
      <h3 className={styles.faqHeader}>Frequently asked questions</h3>
      <div className={styles.faqWrapperCenter}>
        <div className={styles.faqsWrapper}>
          {Faqs.map(({ question, answer, key }) => {
            return <Accordion question={question} answer={answer} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}
