import Input from "../components/ui/Input/Input";

export default {
  title: "components/Input",
  component: Input,
  argTypes: { handleClick: { action: "handleClick" } },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isDisabled: false,
};
