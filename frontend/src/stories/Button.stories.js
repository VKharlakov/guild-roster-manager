import Button from "../components/ui/Button/Button";

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => <Button label="Default" type="default" />;

export const Secondary = () => <Button label="Default" type="submit" />;

export const Tetriary = () => <Button label="Default" type="submit" />;

export const Ghost = () => <Button label="Default" type="submit" />;
