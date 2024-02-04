import styles from "./AddPopup.module.scss";

import Form from "../Form/Form";

type AddPopupProps = {
  props: {
    inputs: {
      label: string;
      id: string;
      placeholder: string;
    }[];

    buttons: {
      label: string;
      type: "primary" | "ghost";
      handleClick: () => {};
    }[];

    title: string;
    titleSpan: string | null;
  };
  isOpen: boolean;
};

function AddPopup({ props, isOpen = false }: AddPopupProps) {
  return (
    <div
      className={
        isOpen
          ? styles["add-popup"]
          : `${styles["add-popup"]} ${styles["add-popup_hidden"]}`
      }
    >
      <h2 className={styles["add-popup__title"]}>
        {props.title}
        {props.titleSpan && (
          <span
            className={styles["add-popup__title-span"]}
          >{` ${props.titleSpan}`}</span>
        )}
      </h2>
      <button
        className={styles["add-popup__close-button"]}
        onClick={() => {
          console.log("You closed the popup");
        }}
      />
      <div className={styles["add-popup__form-container"]}>
        <Form inputs={props.inputs} buttons={props.buttons} />
      </div>
    </div>
  );
}

export default AddPopup;
