import styles from "./Faq.module.css";
import { Accordion } from "../Accordion/Accordion";
import { RoutePath } from "../../constants/route.constants";

const Faqs = [
  {
    key: 0,
    question: "How do I download the application?",
    answer:
      "The application can be downloaded from the App Store for iOS devices. Simply search for the name of the application or use the link in the home page and follow the instructions to download and install it on your device.",
  },
  {
    key: 2,
    question: "What kind of media can I freeze using the application?",
    answer: "The application may allow users to freeze photos, videos, or both.",
  },
  {
    key: 3,
    question: "Can I choose a specific time of day for the reveal, or is it only date-specific?",
    answer: "Users can choose a specific time of day for the reveal.",
  },
  {
    key: 4,
    question: "Is there a limit to the number of photos and videos I can freeze?",
    answer: "The number of photos and videos are unlimited.",
  },
  {
    key: 6,
    question: "Will the application notify me when it's time to reveal the photos and videos?",
    answer: "The application will send a notification when photo will be available in the gallery of unfreeze photos.",
  },
  {
    key: 7,
    question: "Is it possible to share frozen media with others?",
    answer:
      "Depending on the application, users may or may not be able to share the\n" +
      "frozen media with others. Some applications may offer sharing features,\n" +
      "while others may not.",
  },
  {
    key: 8,
    question: "Can I delete frozen media before the reveal date?",
    answer:
      "Depending on the application, users may or may not be able to delete frozen media before the reveal date. Some applications may allow for deleting media, while others may not have this option.",
  },
  {
    key: 9,
    question: "How does the freezing process work?",
    answer:
      "The freezing process may depend on the application, but typically involves\n" +
      "selecting photos or videos to be locked, setting the reveal date and time, and confirming the freezing. The application may use encryption or other security measures to ensure the media cannot be accessed before the reveal date.",
  },
  {
    key: 10,
    question: "Can I use the application to freeze media on multiple devices?",
    answer:
      "This may depend on the application, but some may allow users to freeze\n" +
      "media on multiple devices as long as the user is signed in to the same\n" +
      "account on each device.",
  },
  {
    key: 11,
    question: "What happens if I forget the reveal date or want to change it?",
    answer:
      "Depending on the application, users may be able to change the reveal date,\n" +
      "but typically not after the freezing process has been confirmed. It's important to keep the reveal date in a safe and accessible place to avoid forgetting it.",
  },
];

export function Faq() {
  return (
    <div className={styles.faqsContainerWrapper} id={RoutePath.faq().replace("/", "")}>
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
