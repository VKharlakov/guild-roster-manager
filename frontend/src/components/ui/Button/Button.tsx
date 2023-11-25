import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type: string;
};

function Button({ label, type }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[`button_type_${type}`]}`}>
      {label}
    </button>
  );
}

export default Button;
