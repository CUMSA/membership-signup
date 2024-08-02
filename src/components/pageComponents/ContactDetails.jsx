export const ContactDetails = ({ formData, setFormData }) => {
  return (
    <div className="section">
      <h2>Contact Details</h2>
      <div>
        <label id="Crsid">
          Cambridge CRSID <span className="red">*</span> <br />{" "}
          <span className="subtitle">e.g. xyz123</span>{" "}
        </label>{" "}
        <br />
        <input
          id="Crsid"
          type="text"
          value={formData["Crsid"]}
          onChange={(x) => {
            setFormData({
              ...formData,
              Crsid: x.target.value.toLowerCase().replace(" ", ""),
            });
          }}
        />
      </div>
      <div>
        <label id="Alt Email">
          Alternative Email Address <span className="red">*</span> <br />
          <span class="subtitle">
            Personal email preferred, which we can contact you after graduation
          </span>
        </label>{" "}
        <br />
        <input
          id="Alt Email"
          type="text"
          value={formData["AltEmail"]}
          onChange={(x) => {
            setFormData({
              ...formData,
              AltEmail: x.target.value.toLowerCase().replace(" ", ""),
            });
          }}
        />
      </div>

      <div>
        <label id="UK Num">
          UK Mobile Number <span className="red">*</span>
          <br />
          <span class="subtitle">e.g. +44 7123456789</span>
        </label>{" "}
        <br />
        <input
          id="UK Num"
          type="text"
          value={`+44 ${formData["UKMobile"]}`}
          onChange={(x) => {
            setFormData({
              ...formData,
              UKMobile: x.target.value
                .slice(4)
                .toLowerCase()
                .replace(/[a-z;!@#$%^&*()_|{}\[\]|'";:./,?><~`\\]/g, "")
                .replace(" ", ""),
            });
          }}
          style={{
            position: "relative",
          }}
        />
      </div>

      <div>
        <label for="Home Num">
          Home Mobile Number (with country code)<span className="red">*</span>{" "}
          <br />
          <span className="subtitle">e.g. +65 91234567</span>
        </label>{" "}
        <br />
        <input
          id="Home Num"
          type="text"
          value={formData["HomeMobile"]}
          onChange={(x) => {
            setFormData({
              ...formData,
              HomeMobile: x.target.value
                .toLowerCase()
                .replace(/[a-z;!@#$%^&*()_|{}\[\]|'";:./,?><~`\\]/g, ""),
            });
          }}
        />
      </div>
    </div>
  );
};
