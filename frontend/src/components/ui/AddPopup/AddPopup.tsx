import styles from "./AddPopup.module.scss";

import Form from "../Form/Form";

type AddPopupProps = {
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

function AddPopup({ inputs, buttons, title, titleSpan }: AddPopupProps) {
  return (
    <div className={styles["add-popup"]}>
      <h2 className={styles["add-popup__title"]}>
        {title}
        {titleSpan && (
          <span
            className={styles["add-popup__title-span"]}
          >{` ${titleSpan}`}</span>
        )}
      </h2>
      <button
        className={styles["add-popup__close-button"]}
        onClick={() => {
          console.log("You closed the popup");
        }}
      />
      <div className={styles["add-popup__form-container"]}>
        <Form inputs={inputs} buttons={buttons} />
      </div>
    </div>
  );
}

export default AddPopup;
