import styles from "./AddFormPopup.module.scss";

import Form from "../Form/Form";

type AddFormPopupProps = {
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
};

function AddFormPopup({ inputs, buttons, title }: AddFormPopupProps) {
  return (
    <div className={styles["add-form-popup"]}>
      <h2 className={styles["add-form-popup__title"]}>{title}</h2>
      <button
        className={styles["add-form-popup__close-button"]}
        onClick={() => {
          console.log("You closed the popup");
        }}
      />
      <div className={styles["add-form-popup__form-container"]}>
        <Form inputs={inputs} buttons={buttons} />
      </div>
    </div>
  );
}

export default AddFormPopup;
