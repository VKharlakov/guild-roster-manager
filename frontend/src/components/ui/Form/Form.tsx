import styles from "./Form.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";

type FormProps = {
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
};

function Form({ inputs, buttons }: FormProps) {
  return (
    <form className={styles.form}>
      {inputs?.map((input) => (
        <label className={styles.form__label}>
          {input.label}
          <Input
            id={input.id}
            placeholder={input.placeholder}
            isDisabled={false}
            isValid={true}
          />
        </label>
      ))}
      {buttons.length > 0 && (
        <div className={styles["form__buttons-container"]}>
          {buttons?.map((button) => (
            <Button
              label={button.label}
              type={button.type}
              handleClick={button.handleClick}
              isDisabled={false}
            />
          ))}
        </div>
      )}
    </form>
  );
}

export default Form;
