import { ChatIcon } from "../../icons/Chat.icon";
import styles from "./Chat.module.css";
import { useModal } from "../contexts/modal/Modal.context";
import { ContactForm } from "../../forms/ContactForm/ContactForm";

export function Chat() {
  const { provideModalSettings } = useModal();

  const handleClickChat = () => {
    provideModalSettings({
      isShowing: true,
      content: <ContactForm />,
    });
  };

  return (
    <div className={styles.chatWrapper}>
      <button onClick={handleClickChat} type="button" className={styles.chatButton}>
        <ChatIcon className={styles.chatIcon} />
      </button>
    </div>
  );
}
