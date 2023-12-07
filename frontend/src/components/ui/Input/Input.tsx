import styles from "./Input.module.scss";

type InputProps = {
  isDisabled: boolean;
  id: string | undefined;
  placeholder: string;
  isValid: boolean;
};

function Input({ isDisabled, id, placeholder, isValid = true }: InputProps) {
  return (
    <input
      className={`${styles.input} ${
        isValid ? "" : `${styles.input_type_invalid}`
      }`}
      disabled={isDisabled}
      id={id}
      placeholder={placeholder}
    />
  );
}

export default Input;
