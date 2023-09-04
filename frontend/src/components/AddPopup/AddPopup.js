import "./AddPopup.css";
import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import { euServerList, usServerList } from "../../utils/constants";
import { checkInputsValidity } from "../../utils/utils";
import AddCharacterForm from "./AddCharacterForm/AddCharacterForm";
import AddGuildForm from "./AddGuildForm/AddGuildForm";

function AddPopup({
  isActive,
  rosterId,
  guildData,
  popupType,
  rosterName,
  rosterSize,
  setIsAddPopup,
  isAddingGuild,
  handleAddGuild,
  isUpdatingRoster,
  handleAddCharacter,
}) {
  //Form values state
  const [formValue, setFormValue] = React.useState({
    realm: "",
    name: "",
    region: guildData?.region || "eu",
  });

  let servers = formValue.region === "eu" ? euServerList : usServerList;
  // [WIP] Button state
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const nameRef = React.useRef(null);
  const realmRef = React.useRef(null);

  // ToolTip-related states
  const [memberList, setMemberList] = React.useState([]);
  const [isTooltip, setIsTooltip] = React.useState(false);
  const [currentInputType, setCurrentInputType] = React.useState("");
  const [currentToolTipArray, setCurrentToolTipArray] = React.useState();

  // Open tooltip when input is focused
  function onInputFocus(toolTipArray, inputType) {
    setIsTooltip(true);
    setCurrentInputType(inputType);
    setCurrentToolTipArray(toolTipArray);

    // Run filter again when switching between inputs
    if (formValue[inputType] !== "") {
      search(formValue[inputType], toolTipArray);
    }
  }

  // Search for matching name from tooltip
  function search(value, toolTipArray) {
    setCurrentToolTipArray(
      toolTipArray.filter((item) =>
        item.name.toLowerCase().startsWith(value.trim().toLowerCase())
      )
    );
  }

  // Change form values and search
  function onChange(e, toolTipArray) {
    const { name, value } = e.target;
    search(value, toolTipArray);

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleTooltipClick(item) {
    if (currentInputType === "realm") {
      setFormValue({ ...formValue, realm: item.name });
    } else if (currentInputType === "name") {
      setFormValue({ ...formValue, name: item.name, realm: item.realm });
    }
  }

  // Set button validity every time input value changes
  React.useEffect(() => {
    setIsButtonDisabled(
      !checkInputsValidity([realmRef.current, nameRef.current])
    );
  }, [formValue]);

  // Submit add character form
  function onCharacterSubmit(event) {
    event.preventDefault();

    handleAddCharacter({
      ...formValue,
      parentId: rosterId,
      rosterSize: rosterSize,
    });
  }

  // Submit add guild form
  function onGuildSubmit(event) {
    event.preventDefault();

    handleAddGuild(formValue);
  }

  // Set array of members
  React.useEffect(() => {
    setCurrentInputType("");
    setFormValue({ ...formValue, realm: "", name: "" });
    if (guildData && guildData.members.length > 0) {
      setMemberList(guildData.members.map((member) => member.character));
    }
  }, [guildData, isActive]);

  return (
    <div className={`add-popup${isActive ? " add-popup_active" : ""}`}>
      <button
        className="add-popup__close-button"
        onClick={() => {
          setIsAddPopup(false);
        }}
      />
      {popupType === "character" ? (
        <>
          <h2 className="add-popup__title">
            Add to{" "}
            <span className="add-popup__title-highlight">{rosterName}</span>
          </h2>
          {/* <AddCharacterForm /> */}
        </>
      ) : (
        <>
          <h2 className="add-popup__title">Add your Guild</h2>
          {/* <AddGuildForm /> */}
        </>
      )}

      {isTooltip && currentToolTipArray.length > 0 && (
        <Tooltip
          array={currentToolTipArray}
          input={currentInputType}
          handleTooltipClick={handleTooltipClick}
          setIsTooltip={setIsTooltip}
        />
      )}
    </div>
  );
}

export default AddPopup;
