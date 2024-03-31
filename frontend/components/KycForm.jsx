import { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import { app } from '../app/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';

const KycForm = () => {
  const auth = getAuth(app);
  const { data: session } = useSession();
  const [formInputs, setFormInputs] = useState({
    contact: '',
    address: '',
    aadharNo: '',
    aadharImage: ''
  });
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setSentOtp] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          sendOtp();
          console.log("Recaptcha verified");
        },
        "expired-callback": () => {
          console.log("Recaptcha expired");
        },
        defaultCountry: "IN",
      }
    );
  }, [auth]);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const formattedPhoneNumber = "+91" + formInputs.contact;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setSentOtp(true);
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
      // Handle error (logging, alert, etc.)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "vtxkm6s0");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dcsvvfai3/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log(data);

    await confirmationResult
      .confirm(otp)
      .then(async (res) => {
        try {
          const response = await fetch(`api/users/${session?.user.id}/`, {
            method: "PUT",
            body: JSON.stringify({
              contact: formInputs.contact,
              address: formInputs.address,
              aadharNo: formInputs.aadharNo,
              aadharImage: data.secure_url,
            }),
          });

          if (response.ok) {
            console.log("Successfully Submitted");
            location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid OTP");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;

      setFormInputs({ ...formInputs, aadharImage: result });
    };
  };

  return (
    <section className="flex flex-col items-center mt-8">
      <div className="form-container w-full max-w-md bg-green-100 rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Account Setup Form</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div id="recaptcha-container"></div>
          <div className="flex flex-col">
            <label htmlFor="phone-no" className="font-medium flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              Contact No:
            </label>
            <input type="tel" name="phone" id="phone-no" className="input-field" onChange={(e) => setFormInputs({ ...formInputs, contact: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Address:
            </label>
            <input type="text" name="address" id="address" className="input-field" onChange={(e) => setFormInputs({ ...formInputs, address: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="aadhar" className="font-medium flex items-center">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Aadhar card:
            </label>
            <input type="file" name="file" id="aadhar" className="input-field" onChange={handleImageChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="aadharNo" className="font-medium flex items-center">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Aadhar No:
            </label>
            <input type="number" name="aadharNo" id="aadharNo" className="input-field" onChange={(e) => setFormInputs({ ...formInputs, aadharNo: e.target.value })} />
          </div>
          <div className="space-x-4">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            <button type="reset" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset</button>
          </div>
        </form>
        <form className="space-y-4" onSubmit={sendOtp}>
          <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Generate OTP</button>
          <div className="flex flex-col">
            <label htmlFor="otp" className="font-medium">
              OTP:
            </label>
            <input
              type="number"
              name="otp"
              id="otp"
              className="input-field"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default KycForm;
