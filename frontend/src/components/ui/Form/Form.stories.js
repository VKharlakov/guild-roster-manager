import Form from "./Form";

export default {
  title: "components/ui/Form",
  component: Form,
};

const Template = (args) => <Form {...args} />;
export const RegisterForm = Template.bind({});
RegisterForm.args = {
  inputs: [
    {
      label: `Name`,
      id: "name",
      placeholder: "Vasiliy Petrov",
    },
    {
      label: `Country`,
      id: "country",
      placeholder: "Serbia",
    },
    {
      label: `Date of birth`,
      id: "dateOfBirth",
      placeholder: "this will be done later",
    },
    {
      label: `I agree with policies`,
      id: "policyAgreement",
      placeholder: "later",
    },
  ],
  buttons: [
    {
      label: "OK",
      type: "primary",
      handleClick: () => {
        console.log("char is added");
      },
    },
    {
      label: "Not sure?",
      type: "ghost",
      handleClick: () => {
        console.log("char is added");
      },
    },
  ],
};
