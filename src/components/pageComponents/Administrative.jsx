export const Administrative = ({ formData, setFormData }) => {
  let currMembershipCycle = new Date().getFullYear();
  const month = new Date().getMonth();
  if (month < 6) {
    currMembershipCycle -= 1;
  }

  return (
    <div
      style={{
        marginBottom: 30,
      }}
    >
      <h2>Administrative</h2>

      <label for="MembershipTypeYear">
        Membership Type <span className="red">*</span>
        <br />
        <span className="subtitle">
          <b>Life membership is £20 and 1 year membership is £12</b>
          <br />1 year membership spans the academic year. Signing up for 1 year
          now means that membership start Oct {currMembershipCycle} and ends
          Sept {currMembershipCycle + 1}.
        </span>
      </label>
      <br />
      <fieldset id="MembershipTypeYear" style={{ border: "none" }}>
        <input
          id="1 year"
          type="radio"
          value="1 year"
          checked={
            formData.MembershipType ==
            `1 year (${currMembershipCycle}-${currMembershipCycle + 1})`
          }
          onChange={(v) =>
            setFormData({
              ...formData,
              MembershipType: `1 year (${currMembershipCycle}-${
                currMembershipCycle + 1
              })`,
            })
          }
        />
        <label for="1 year" class="radioLabel">
          <span className="price">£12</span> 1 year{" "}
          {`(${currMembershipCycle}-${currMembershipCycle + 1})`}
        </label>

        <input
          id="MembershipTypeLife"
          type="radio"
          value="MembershipTypeLife"
          checked={formData.MembershipType == "Life"}
          onChange={(v) => setFormData({ ...formData, MembershipType: "Life" })}
        />
        <label for="MembershipTypeLife" class="radioLabel">
          <span className="price">£20</span> Life
        </label>
      </fieldset>

      <div>
        <label for="privacyL">
          While CUMSA acknowledges the importance of data privacy, we may
          occasionally need to release our members’ details to our sponsors.{" "}
          <span className="red">*</span>
        </label>
        <fieldset id="privacyL" style={{ borderWidth: 0 }}>
          <p>
            <input
              id="privacy"
              type="radio"
              value="MembershipTypeLife"
              checked={formData.Privacy}
              onChange={() => setFormData({ ...formData, Privacy: true })}
            />
            <label for="privacy" class="radioLabel">
              I have read and understood the above statement
            </label>
          </p>
        </fieldset>
      </div>
    </div>
  );
};
