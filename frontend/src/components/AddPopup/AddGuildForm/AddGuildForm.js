// function AddGuildForm() {
//   return (
//     <form
//       className="add-popup__form add-popup__form_type_guild"
//       name="form"
//       onSubmit={(event) => onGuildSubmit(event)}
//     >
//       <div className="add-popup__inputs">
//         <div className="add-popup__radio-container">
//           <label className="add-popup__radio-title">Region:</label>
//           <div className="add-popup__radio">
//             <label className="add-popup__radio-label">
//               EU
//               <input
//                 type="radio"
//                 name="region"
//                 value={"eu"}
//                 className="add-popup__radio-input"
//                 required
//                 onChange={(event) => onChange(event, [])}
//                 // checked={formValue.region === "eu"}
//                 defaultChecked
//               />
//               <span className="add-popup__radio-input-custom" />
//             </label>
//             <label className="add-popup__radio-label">
//               US
//               <input
//                 type="radio"
//                 name="region"
//                 value={"us"}
//                 onChange={(event) => onChange(event, [])}
//                 // checked={formValue.region === "us"}
//                 required
//                 className="add-popup__radio-input"
//               />
//               <span className="add-popup__radio-input-custom" />
//             </label>
//           </div>
//         </div>
//         <label className="add-popup__label">
//           Guild's title:
//           <input
//             ref={nameRef}
//             className="add-popup__input add-popup__input_type_text"
//             name="name"
//             onFocus={() => setIsTooltip(false)}
//             onChange={(event) => onChange(event, [])}
//             value={formValue.name}
//             placeholder="title"
//             autoComplete="off"
//             required
//           />
//           <p className="add-popup__required">required</p>
//         </label>
//         <label className="add-popup__label">
//           Guild's realm:
//           <input
//             ref={realmRef}
//             className="add-popup__input add-popup__input_type_text"
//             name="realm"
//             value={formValue.realm}
//             onChange={(event) => onChange(event, servers)}
//             onFocus={() => {
//               onInputFocus(servers, "realm");
//             }}
//             placeholder="realm"
//             autoComplete="off"
//             required
//           />
//           <p className="add-popup__required">required</p>
//         </label>
//       </div>
//       <button
//         className="add-popup__submit-button"
//         type="submit"
//         disabled={isAddingGuild || isButtonDisabled}
//       >
//         {!isAddingGuild ? "Submit" : "Please wait..."}
//       </button>
//     </form>
//   );
// }

// export default AddGuildForm;
