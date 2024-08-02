import React, { useState } from "react";
import downarrow from "../../assets/downArrow.png";
import scholarshipMap from "../../util/scholarshipMapping.json";

export const ScholarshipForm = ({ formData, setFormData }) => {
  const [hasScholar, setHasScholar] = useState(false);

  return (
    <>
      <label for="Scholarship">
        Are you on Scholarship? <span className="red">*</span>
      </label>
      <br />
      <div className="selectBox">
        <select
          id="Scholarship"
          value={hasScholar}
          onChange={(x) => {
            setHasScholar(x.target.value);
            if (x.target.value == "false") {
              setFormData({ ...formData, Scholarship: "None" });
            } else {
              setFormData({ ...formData, Scholarship: "" });
            }
          }}
        >
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
        <img src={downarrow} className="downArrow" />
      </div>

      {hasScholar == "true" && (
        <>
          <label for="Scholarship">
            Scholarship Specification <span className="red">*</span>
            <br />
            <span class="subtitle">Specify your scholarship name</span>
          </label>
          <br />
          <input
            type="text"
            name="scholarship"
            id="Scholarship"
            value={formData.Scholarship}
            onChange={(v) => {
              setFormData({ ...formData, Scholarship: v.target.value });
            }}
          />
        </>
      )}
    </>
  );
};
