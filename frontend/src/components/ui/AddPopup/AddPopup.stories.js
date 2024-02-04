import AddPopup from "./AddPopup";

export default {
  title: "components/AddPopup",
  component: AddPopup,
};

const Template = (args) => <AddPopup {...args} />;
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
  title: "Add char to",
  titleSpan: "Main",
};
