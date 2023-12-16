import styles from "./Form.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";

function Form() {
  return (
    <form className={styles.form}>
      <label>
        Character's name:
        <Input
          isDisabled={false}
          isValid={true}
          id="charName"
          placeholder="Enter your name"
        />
      </label>
      <label>
        Character's realm:
        <Input
          isDisabled={false}
          isValid={true}
          id="charRealm"
          placeholder="Enter your realm"
        />
      </label>
      <Button
        label="Submit"
        type="primary"
        handleClick={() => {
          console.log("char submited");
        }}
        isDisabled={false}
      />
    </form>
  );
}

export default Form;
