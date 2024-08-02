export const PersonalParticulars = ({ formData, setFormData }) => {
  const nameUpper = (name) => {
    return name
      .split(" ")
      .map((e) => `${e.charAt(0).toUpperCase()}${e.slice(1).toLowerCase()}`)
      .join(" ");
  };
  return (
    <div className="section">
      <h2>Personal Particulars</h2>
      <div>
        <label id="FirstName">
          First name <span className="red">*</span>
        </label>{" "}
        <br />
        <input
          id="FirstName"
          type="text"
          name="FirstName"
          value={formData["FirstName"]}
          onChange={(x) => {
            setFormData({ ...formData, FirstName: nameUpper(x.target.value) });
          }}
        />
      </div>

      <div>
        <label id="LastName">
          Last name <span className="red">*</span>
        </label>
        <br />
        <input
          id="LastName"
          type="text"
          name="LastName"
          value={formData["LastName"]}
          onChange={(x) => {
            setFormData({ ...formData, LastName: nameUpper(x.target.value) });
          }}
        />
      </div>

      <div>
        <label for="Gender">
          Gender <span className="red">*</span>
        </label>{" "}
        <br />
        <fieldset id="Gender" style={{ border: "none" }}>
          <input
            id="Male"
            type="radio"
            name="Gender"
            value="Male"
            checked={formData.Gender == "Male"}
            onChange={(v) => setFormData({ ...formData, Gender: "Male" })}
          />
          <label for="Male" class="radioLabel">
            Male
          </label>

          <input
            id="Female"
            type="radio"
            name="Gender"
            value="Female"
            checked={formData.Gender == "Female"}
            onChange={(v) => setFormData({ ...formData, Gender: "Female" })}
          />
          <label for="Female" class="radioLabel">
            Female
          </label>
        </fieldset>
      </div>

      <div>
        <label id="DateofBirth">
          Date of Birth <span className="red">*</span>
        </label>{" "}
        <br />
        <input
          id="DateofBirth"
          type="date"
          name="DateofBirth"
          onChange={(v) => {
            setFormData({
              ...formData,
              DateofBirth: v.target.value,
            });
          }}
          value={formData.DateofBirth}
        />
      </div>

      <div>
        <label id="Nationality">
          Nationality <span className="red">*</span>
        </label>{" "}
        <br />
        <input
          id="Nationality"
          type="text"
          name="Nationality"
          value={formData["Nationality"]}
          onChange={(x) => {
            setFormData({
              ...formData,
              Nationality: nameUpper(x.target.value),
            });
          }}
        />
      </div>

      <div>
        <label for="SingaporeanPR">
          Are you a Singapore Permanent Resident <span className="red">*</span>
        </label>{" "}
        <br />
        <fieldset id="SingaporeanPR" style={{ border: "none" }}>
          <input
            id="SingaporeanPRYes"
            type="radio"
            name="SingaporeanPR"
            value="Yes"
            checked={formData.SingaporeanPR == true}
            onChange={(v) => setFormData({ ...formData, SingaporeanPR: true })}
          />
          <label for="SingaporeanPRYes" class="radioLabel">
            Yes
          </label>

          <input
            id="SingaporeanPRNo"
            type="radio"
            name="SingaporeanPR"
            value="No"
            checked={formData.SingaporeanPR == false}
            onChange={(v) => setFormData({ ...formData, SingaporeanPR: false })}
          />
          <label for="SingaporeanPRNo" class="radioLabel">
            No
          </label>
        </fieldset>
      </div>
    </div>
  );
};
