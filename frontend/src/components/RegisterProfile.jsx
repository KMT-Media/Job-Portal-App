import React from 'react';
import '../js/Register.js';
import '../scss/Register.css';

const RegisterProfile = () => {
  return (
    <form>
      <div class='form first'>
        <div class='details personal'>
          <span class='title'>Personal Details</span>
          <div class='fields'>
            <div class='input-field'>
              <label>First Name</label>
              <input type='text' placeholder='Enter your name' required />
            </div>

            <div class='input-field'>
              <label>Last Name</label>
              <input type='text' placeholder='Enter your email' required />
            </div>

            <div class='input-field'>
              <label>Date of Birth</label>
              <input type='date' placeholder='Enter birth date' required />
            </div>

            <div class='input-field'>
              <label>Place of birth</label>
              <input type='text' placeholder='Where you born...' required />
            </div>

            <div class='input-field'>
              <label>Gender</label>
              <select required>
                <option disabled selected>
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div class='input-field'>
              <label>Nationality</label>
              <input type='text' placeholder='Ethiopian...' required />
            </div>
          </div>
        </div>

        <div class='details ID'>
          <span class='title'>Identity Details</span>

          <div class='fields'>
            <div class='input-field'>
              <label>City</label>
              <input type='text' placeholder='Enter your city' required />
            </div>

            <div class='input-field'>
              <label>Address</label>
              <input type='text' placeholder='Enter your address' required />
            </div>

            <div class='input-field'>
              <label>Phone Number</label>
              <input type='text' placeholder='Enter phone number' required />
            </div>

            <div class='input-field'>
              <label>Marital Status</label>
              <input type='text' placeholder='Single or Married' required />
            </div>

            <div class='input-field'>
              <label>work Email</label>
              <input
                type='email'
                placeholder='Enter your work email'
                required
              />
            </div>

            <div class='input-field'>
              <label>Health</label>
              <input type='text' placeholder='Healthy or Disable' required />
            </div>
          </div>

          <button class='nextBtn'>
            <span class='btnText'>Next</span>
            <i class='uil uil-navigator'></i>
          </button>
        </div>
      </div>

      <div class='form second'>
        <div class='details address'>
          <span class='title'>Educational Background</span>

          <div class='fields'>
            <div class='input-field'>
              <label>University Name</label>
              <input type='text' placeholder='where you graduate' required />
            </div>

            <div class='input-field'>
              <label>Field of study</label>
              <input type='text' placeholder='Electrical...' required />
            </div>

            <div class='input-field'>
              <label>Year of graduation</label>
              <input type='text' placeholder='when you graduate' required />
            </div>

            <div class='input-field'>
              <label>Expericnce</label>
              <input type='text' placeholder='1 or 2' required />
            </div>

            <div class='input-field'>
              <label>Cirtifications</label>
              <input type='text' placeholder='Any achivements' required />
            </div>

            <div class='input-field'>
              <label>GPA</label>
              <input type='number' placeholder='Enter your GPA' required />
            </div>
          </div>
        </div>

        <div class='details family'>
          <span class='title'>References</span>

          <div class='fields'>
            <div class='input-field'>
              <label>Full Name</label>
              <input
                type='text'
                placeholder="Reference's full name.."
                required
              />
            </div>

            <div class='input-field'>
              <label>Job title</label>
              <input type='text' placeholder="Reference's job title" required />
            </div>

            <div class='input-field'>
              <label>Email</label>
              <input type='text' placeholder="Reference's Email" required />
            </div>

            <div class='input-field'>
              <label>Telephone</label>
              <input type='text' placeholder="Reference's Telephone" required />
            </div>

            <div class='input-field'>
              <label>Father in Law</label>
              <input type='text' placeholder='Father in law name' required />
            </div>

            <div class='input-field'>
              <label>Mother in Law</label>
              <input type='text' placeholder='Mother in law name' required />
            </div>
          </div>

          <div class='buttons'>
            <div class='backBtn'>
              <i class='uil uil-navigator'></i>
              <span class='btnText'>Back</span>
            </div>

            <button class='sumbit'>
              <span class='btnText'>Submit</span>
              <i class='uil uil-navigator'></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterProfile;
