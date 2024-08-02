import "./App.css";
import { useState } from "react";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import loadingGif from "./assets/loading-gif.gif";
import { valData } from "./util/validateData";
import { Banner } from "./components/pageComponents/Banner";
import { PersonalParticulars } from "./components/pageComponents/PersonalParticulars";
import { ContactDetails } from "./components/pageComponents/ContactDetails";
import { CollegeAndCourse } from "./components/pageComponents/CollegeAndCourse";
import { Administrative } from "./components/pageComponents/Administrative";
import { Filled } from "./components/Filled";

function App() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DateofBirth: "",
    Nationality: "",
    SingaporeanPR: null,
    Crsid: "",
    AltEmail: "",
    UKMobile: "",
    HomeMobile: "",
    UKAddress: "",
    MatriculationYear: "",
    GraduationYear: "",
    College: "",
    Course: "",
    Scholarship: "1",
    MembershipType: "",
    Privacy: false,
  });

  const [err, setErr] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [filled, setFilled] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log(formData);
    const { success, data } = valData(formData);

    if (!success) {
      setErr(data);
      window.scroll(0, 0);
    } else {
      setIsLoad(true);

      axios
        .post(process.env.REACT_APP_APILINK, data, {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.REACT_APP_APIKEY,
          },
        })
        .then(() => {
          setIsLoad(false);
          setFilled(true);
          setErr("");
          setFormData({
            FirstName: "",
            LastName: "",
            Gender: "",
            DateofBirth: "",
            Nationality: "",
            SingaporeanPR: null,
            Crsid: "",
            AltEmail: "",
            UKMobile: "",
            HomeMobile: "",
            UKAddress: "",
            MatriculationYear: "",
            GraduationYear: "",
            College: -1,
            Course: "1",
            Scholarship: "1",
            MembershipType: "",
            Privacy: false,
          });
        })
        .catch((e) => {
          console.log("err", e);
          if (e.response.data.message == "The conditional request failed") {
            setErr("You have already registered.");
          } else {
            setErr("Server Err. " + e.response.data.message);
          }
          setIsLoad(false);
          setFormData({
            FirstName: "",
            LastName: "",
            Gender: "",
            DateofBirth: "",
            Nationality: "",
            SingaporeanPR: null,
            Crsid: "",
            AltEmail: "",
            UKMobile: "",
            HomeMobile: "",
            UKAddress: "",
            MatriculationYear: "",
            GraduationYear: "",
            College: -1,
            Course: "1",
            Scholarship: "1",
            MembershipType: "",
            Privacy: false,
          });
        });
    }
  };

  return (
    <div className="container">
      {filled ? (
        <Filled />
      ) : (
        <div className="form">
          <Banner err={err} isLoad={isLoad} />

          {isLoad ? (
            <div className="center">
              <img
                style={{
                  width: 100,
                }}
                src={loadingGif}
                alt="loading..."
              />
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <PersonalParticulars
                formData={formData}
                setFormData={setFormData}
              />

              <ContactDetails formData={formData} setFormData={setFormData} />

              <CollegeAndCourse formData={formData} setFormData={setFormData} />

              <Administrative formData={formData} setFormData={setFormData} />

              <button class="submitButton" onClick={submit}>
                Submit
              </button>

              {/* Error message */}
              {<p className="red">{err}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
