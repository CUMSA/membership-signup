import { useState } from "react";
import downarrow from "../../assets/downArrow.png";
import coursemap from "../../util/courseMapping.json";

export const CourseForm = ({ formData, setFormData }) => {
  const [isOthers, setIsOthers] = useState(false);
  return (
    <>
      <label for="StudentType">
        Student Type <span className="red">*</span>
      </label>
      <br />
      <div className="selectBox">
        <select
          name="StudentType"
          id="StudentType"
          required="required"
          value={formData.StudentType}
          onChange={(v) => {
            setFormData({
              ...formData,
              Course: "",
              StudentType: v.target.value,
            });
          }}
        >
          <option value="">None</option>
          <option value="Undergrad">Undergrad</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
        <img src={downarrow} className="downArrow" />
      </div>

      {formData.StudentType == "Undergrad" && (
        <>
          <label for="Course">
            Course <span className="red">*</span>
          </label>
          <br />
          <div className="selectBox">
            <select
              name="course"
              id="Course"
              required="required"
              value={formData.Course}
              onChange={(v) => {
                if (v.target.value == "Others") {
                  setIsOthers(true);
                  setFormData({ ...formData, Course: "" });
                } else {
                  setIsOthers(false);
                  setFormData({ ...formData, Course: v.target.value });
                }
              }}
            >
              <option value="">None</option>
              {Object.keys(coursemap).map((k) => (
                <option value={coursemap[k]}>{coursemap[k]}</option>
              ))}
            </select>
            <img src={downarrow} className="downArrow" />
          </div>
        </>
      )}

      {(formData.StudentType != "Undergrad" || isOthers) && (
        <>
          <label for="Course">
            Course Specification <span className="red">*</span>
            <br />
            <span class="subtitle">
              Specify your qualification + course name (e.g. MPhil Economics)
            </span>
          </label>
          <br />
          <input
            type="text"
            name="course"
            id="Course"
            value={formData.Course}
            onChange={(v) => {
              setFormData({ ...formData, Course: v.target.value });
            }}
          />
        </>
      )}
    </>
  );
};
