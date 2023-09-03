import "./Tooltip.css";
import React from "react";

function Tooltip({ array, input, setIsTooltip, handleTooltipClick }) {
  // Pass chosen option to the form
  function onClick(item) {
    handleTooltipClick(item);
    setIsTooltip(false);
  }

  // Close tooltip when clicked outside
  const ref = React.useRef(null);
  function handleClickOutside(event) {
    if (
      !ref.current.contains(event.target) &&
      event.target.tagName !== "INPUT"
    ) {
      setIsTooltip(false);
    }
  }

  React.useEffect(() => {
    // Set listeners on component mounting
    document.addEventListener("click", handleClickOutside, true);

    // Remove listeners on dismounting
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="tooltip__container" ref={ref}>
      <ul className="tooltip">
        {array.map((item, index) => (
          <li
            className={`tooltip__text ${
              item.class && input === "name"
                ? `tooltip__text_class_${item.class
                    .replace(/\s/g, "-")
                    .toLowerCase()}`
                : ""
            }`}
            onClick={() => {
              onClick(item);
            }}
            key={index}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tooltip;
