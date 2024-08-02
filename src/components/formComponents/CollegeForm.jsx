import downarrow from "../../assets/downArrow.png";
import colleges from "../../util/collegeMapping.json";

export const CollegeForm = ({ formData, setFormData }) => {
  return (
    <div className="selectBox">
      <select
        name="college_id"
        id="College"
        required="required"
        // onChange={(v) => { setData(...data, College: v) }}
        value={formData.College}
        onChange={(v) => {
          setFormData({ ...formData, College: v.target.value });
        }}
      >
        <option value="">None</option>
        {Object.keys(colleges).map((k) => (
          <option value={`${k}`}>{colleges[k]}</option>
        ))}
      </select>
      <img src={downarrow} className="downArrow" />
    </div>
  );
};
