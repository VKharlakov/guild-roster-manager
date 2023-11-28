import styles from "./Input.scss";

type InputProps = {
  isDisabled: boolean;
};

function Input({ isDisabled }: InputProps) {
  return <input className={styles.input} disabled={isDisabled} />;
}

export default Input;
