import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type: "primary" | "secondary" | "tetriary" | "ghost";
  handleClick: () => void;
  isDisabled: boolean;
};

function Button({ label, type, handleClick, isDisabled }: ButtonProps) {
  function onClick(event: any) {
    event.preventDefault();
    handleClick();
  }

  return (
    <button
      onClick={(event) => onClick(event)}
      disabled={isDisabled}
      className={`${styles.button} ${styles[`button_type_${type}`]}`}
    >
      {label}
    </button>
  );
}

export default Button;
