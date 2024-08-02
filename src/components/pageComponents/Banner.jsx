export const Banner = ({ err, isLoad }) => {
  return (
    <div className={isLoad && "overlay"}>
      <div className={"banner"}>
        <img
          src="cumsa-banner.png"
          alt="cumsa-banner"
          style={{
            maxWidth: "85vw",
          }}
        />
      </div>
      <div className="section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ marginRight: "10px" }}>Membership Registration</h1>
          <p
            style={{
              backgroundColor: "lightcoral",
              borderRadius: "5px",
              padding: "5px",
              color: "white",
              fontWeight: 600,
            }}
          >
            NEW
          </p>
        </div>
        <p>
          Register as a CUMSA member to enjoy our benefits! Do note that
          membership registration is only available for Cambridge students with
          a CRSid (this is the front part of your university email). After
          filling in this registration form, you will receive a separate email
          with instructions on how to make payment to confirm your membership.
          <br />
          <br />
          <span>
            Note that Life membership costs <u>£20</u>, and 1 year membership
            costs <u>£12</u>.
          </span>
        </p>
        <p className="red">* Required</p>

        {err && (
          <p className="err">
            <b>[ERROR] </b>
            {err}
          </p>
        )}
      </div>
    </div>
  );
};
