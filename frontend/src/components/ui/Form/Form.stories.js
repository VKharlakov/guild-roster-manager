import Form from "./Form";

export default {
  title: "components/Form",
  component: Form,
};

const Template = (args) => <Form {...args} />;
export const AddCharacterForm = Template.bind({});
AddCharacterForm.args = {
  inputs: [
    {
      label: `Character's name`,
      id: "charName",
      placeholder: "name",
    },
    {
      label: `Character's realm`,
      id: "charRealm",
      placeholder: "realm",
    },
  ],
  buttons: [
    {
      label: "Add",
      type: "primary",
      handleClick: () => {
        console.log("char is added");
      },
    },
  ],
};
