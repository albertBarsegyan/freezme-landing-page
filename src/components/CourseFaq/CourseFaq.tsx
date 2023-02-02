import { Faq } from "../../types/faq.types";
import { useState } from "react";
import { getDataByLocale } from "../../utils/object.utils";
import { useRouter } from "next/router";
import { RadioButton } from "../general/Button/Radio/RadioButton";
import { ButtonVariant, PrimaryButton } from "../general/Button/Primary/PrimaryButton";
import styles from "./CourseFaq.module.css";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

export function CourseFaq({ faqs }: { faqs: Faq[] }) {
  const { locale } = useRouter();
  const [activeFaq, setActiveFaq] = useState<Faq>(faqs[0]);
  const { t: translation } = useTranslation("courses");

  const activeQuestion = getDataByLocale({ locale, field: "question", object: activeFaq });
  const activeAnswer = getDataByLocale({ locale, field: "answer", object: activeFaq });

  const handleChangeActiveFaq = (question: string) => () => {
    const faqByQuestion = faqs.find((faq) => {
      const itemQuestion = getDataByLocale({ locale, field: "question", object: faq });

      return itemQuestion === question;
    });

    setActiveFaq(faqByQuestion as Faq);
  };

  const getQuestionTextStyles = (isActive: boolean) =>
    classNames({
      [styles.question]: !isActive,
      [styles.questionActive]: isActive,
    });

  if (!faqs.length) return null;

  return (
    <div className={styles.courseFaqWrapper}>
      <h2 className={styles.faqsHeader}>{translation("course-faq-title")}</h2>
      <div className={styles.questionAndAnswerWrapper}>
        <div className={styles.faqsWrapper}>
          {faqs.map((faq) => {
            const question = getDataByLocale({ locale, field: "question", object: faq });

            return (
              <PrimaryButton
                className={styles.faqButton}
                variant={ButtonVariant.TextPrimary}
                handleClick={handleChangeActiveFaq(question)}
                key={faq.question_en_us}
              >
                <RadioButton isActive={question === activeQuestion} />

                <p className={getQuestionTextStyles(question === activeQuestion)}>{question}</p>
              </PrimaryButton>
            );
          })}
        </div>

        <div style={{ width: "fit-content" }}>
          <p className={styles.activeAnswer}>{activeAnswer}</p>
        </div>
      </div>
    </div>
  );
}
