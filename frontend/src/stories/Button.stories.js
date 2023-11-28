import Button from "../components/ui/Button/Button";

export default {
  title: "components/Button",
  component: Button,
  argTypes: { handleClick: { action: "handleClick" } },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
  type: "primary",
  isDisabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
  type: "secondary",
  isDisabled: false,
};

export const Tetriary = Template.bind({});
Tetriary.args = {
  label: "Button",
  type: "tetriary",
  isDisabled: false,
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: "Button",
  type: "ghost",
  isDisabled: false,
};
