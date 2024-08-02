import { CollegeForm } from "../formComponents/CollegeForm";
import { CourseForm } from "../formComponents/CourseForm";
import { ScholarshipForm } from "../formComponents/ScholarshipForm";

export const CollegeAndCourse = ({ formData, setFormData }) => {
  return (
    <div className="section">
      <h2>College and Course</h2>
      <div>
        <label id="Matric">
          Matriculation Year <span className="red">*</span>
        </label>
        <br />
        <input
          id="Matric"
          type="number"
          name="MatricYear"
          value={formData.MatriculationYear}
          onChange={(x) => {
            setFormData({ ...formData, MatriculationYear: x.target.value });
          }}
        />
      </div>

      <div>
        <label id="Grad">
          Graduation Year <span className="red">*</span>
        </label>
        <br />
        <input
          id="Grad"
          type="number"
          name="GradYear"
          value={formData.GraduationYear}
          onChange={(x) => {
            setFormData({ ...formData, GraduationYear: x.target.value });
          }}
        />
      </div>

      <div>
        <label for="College">
          College <span className="red">*</span>
        </label>
        <br />
        <CollegeForm formData={formData} setFormData={setFormData} />
      </div>

      <div>
        <CourseForm formData={formData} setFormData={setFormData} />
      </div>

      <div>
        <ScholarshipForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};
