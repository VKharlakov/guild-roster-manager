import "./AddPopup.css";
import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import { euServerList as servers } from "../../utils/constants";
import { checkInputsValidity } from "../../utils/utils";

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
    region: "eu",
  });

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

  function addCharacterForm() {
    return (
      <form
        className="add-popup__form add-popup__form_type_character"
        name="form"
        onSubmit={(event) => {
          onCharacterSubmit(event);
        }}
      >
        <div className="add-popup__inputs">
          <label className="add-popup__label">
            Character's name:
            <input
              ref={nameRef}
              onFocus={() => {
                onInputFocus(memberList, "name");
              }}
              onChange={(event) => {
                onChange(event, memberList);
              }}
              className="add-popup__input add-popup__input_type_text"
              name="name"
              placeholder="name"
              value={formValue.name}
              minLength="1"
              required
              autoComplete="off"
            />
            <p className="add-popup__required">required</p>
          </label>
          <label className="add-popup__label">
            Character's realm:
            <input
              ref={realmRef}
              onFocus={() => {
                onInputFocus(servers, "realm");
              }}
              onChange={(event) => {
                onChange(event, servers);
              }}
              className="add-popup__input add-popup__input_type_text"
              name="realm"
              placeholder="realm"
              value={formValue.realm}
              minLength="1"
              required
              autoComplete="off"
            />
            <p className="add-popup__required">required</p>
          </label>
        </div>
        <button
          className="add-popup__submit-button"
          type="submit"
          disabled={isUpdatingRoster || isButtonDisabled}
        >
          {!isUpdatingRoster ? "Submit" : "Please wait..."}
        </button>
      </form>
    );
  }

  function addGuildForm() {
    return (
      <form
        className="add-popup__form add-popup__form_type_guild"
        name="form"
        onSubmit={(event) => onGuildSubmit(event)}
      >
        <div className="add-popup__inputs">
          <div className="add-popup__radio-container">
            <label className="add-popup__radio-title">Region:</label>
            <div className="add-popup__radio">
              <label className="add-popup__radio-label">
                EU
                <input
                  type="radio"
                  name="region"
                  value={"eu"}
                  className="add-popup__radio-input"
                  required
                  onChange={(event) => onChange(event, [])}
                  checked={formValue.region === "eu"}
                  defaultChecked
                />
                <span className="add-popup__radio-input-custom" />
              </label>
              <label className="add-popup__radio-label">
                US
                <input
                  type="radio"
                  name="region"
                  value={"us"}
                  onChange={(event) => onChange(event, [])}
                  checked={formValue.region === "us"}
                  required
                  className="add-popup__radio-input"
                />
                <span className="add-popup__radio-input-custom" />
              </label>
            </div>
          </div>
          <label className="add-popup__label">
            Guild's title:
            <input
              ref={nameRef}
              className="add-popup__input add-popup__input_type_text"
              name="name"
              onFocus={() => setIsTooltip(false)}
              onChange={(event) => onChange(event, [])}
              value={formValue.name}
              placeholder="title"
              autoComplete="off"
              required
            />
            <p className="add-popup__required">required</p>
          </label>
          <label className="add-popup__label">
            Guild's realm:
            <input
              ref={realmRef}
              className="add-popup__input add-popup__input_type_text"
              name="realm"
              value={formValue.realm}
              onChange={(event) => onChange(event, servers)}
              onFocus={() => {
                onInputFocus(servers, "realm");
              }}
              placeholder="realm"
              autoComplete="off"
              required
            />
            <p className="add-popup__required">required</p>
          </label>
        </div>
        <button
          className="add-popup__submit-button"
          type="submit"
          disabled={isAddingGuild || isButtonDisabled}
        >
          {!isAddingGuild ? "Submit" : "Please wait..."}
        </button>
      </form>
    );
  }

  return (
    <div className={`add-popup${isActive ? " add-popup_active" : ""}`}>
      <button
        className="add-popup__close-button"
        onClick={() => {
          setIsAddPopup(false);
        }}
      />
      {popupType === "character" ? (
        <h2 className="add-popup__title">
          Add to{" "}
          <span className="add-popup__title-highlight">{rosterName}</span>
        </h2>
      ) : (
        <h2 className="add-popup__title">Add your Guild</h2>
      )}
      {popupType === "character" ? addCharacterForm() : addGuildForm()}

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
