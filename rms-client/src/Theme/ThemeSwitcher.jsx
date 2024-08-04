import React, { useState } from "react";

function ThemeSwitcher() {
  // Use state to manage the checked state
  const [isChecked, setIsChecked] = useState(true);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    //   console.log(isChecked);

    if (isChecked) {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <div className="flex gap-3 my-5 justify-end">
      <p className="px-2">Switch Theme: </p>
      <label>
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>

      <p className="px-2">{isChecked ? "Light Mode" : "Dark Mode"}</p>
    </div>
  );
}

export default ThemeSwitcher;
