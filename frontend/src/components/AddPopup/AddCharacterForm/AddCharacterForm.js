// function AddCharacterForm({ formType }) {
//   return (
//     <form
//       className="add-popup__form add-popup__form_type_character"
//       name="form"
//       onSubmit={(event) => {
//         onCharacterSubmit(event);
//       }}
//     >
//       <div className="add-popup__inputs">
//         <label className="add-popup__label">
//           Character's name:
//           <input
//             ref={nameRef}
//             onFocus={() => {
//               onInputFocus(memberList, "name");
//             }}
//             onChange={(event) => {
//               onChange(event, memberList);
//             }}
//             className="add-popup__input add-popup__input_type_text"
//             name="name"
//             placeholder="name"
//             value={formValue.name}
//             minLength="1"
//             required
//             autoComplete="off"
//           />
//           <p className="add-popup__required">required</p>
//         </label>
//         <label className="add-popup__label">
//           Character's realm:
//           <input
//             ref={realmRef}
//             onFocus={() => {
//               onInputFocus(servers, "realm");
//             }}
//             onChange={(event) => {
//               onChange(event, servers);
//             }}
//             className="add-popup__input add-popup__input_type_text"
//             name="realm"
//             placeholder="realm"
//             value={formValue.realm}
//             minLength="1"
//             required
//             autoComplete="off"
//           />
//           <p className="add-popup__required">required</p>
//         </label>
//       </div>
//       <button
//         className="add-popup__submit-button"
//         type="submit"
//         disabled={isUpdatingRoster || isButtonDisabled}
//       >
//         {!isUpdatingRoster ? "Submit" : "Please wait..."}
//       </button>
//     </form>
//   );
// }

// // export default AddCharacterForm;
