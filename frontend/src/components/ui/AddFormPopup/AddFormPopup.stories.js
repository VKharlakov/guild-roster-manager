import AddFormPopup from "./AddFormPopup";

export default {
  title: "components/AddFormPopup",
  component: AddFormPopup,
};

const Template = (args) => <AddFormPopup {...args} />;
export const AddCharacter = Template.bind({});
AddCharacter.args = {
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
  title: "Add char!",
};
