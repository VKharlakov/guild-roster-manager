import Button from "./Button";

export default {
  title: "components/ui/Button",
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

export const Ghost = Template.bind({});
Ghost.args = {
  label: "Button",
  type: "ghost",
  isDisabled: false,
};
