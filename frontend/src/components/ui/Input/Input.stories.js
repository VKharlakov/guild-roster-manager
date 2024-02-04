import Input from "./Input";

export default {
  title: "components/ui/Input",
  component: Input,
  argTypes: { handleClick: { action: "handleClick" } },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isDisabled: false,
  placeholder: "Primary input",
  isValid: true,
};
