import React, { useState } from "react";
import axios from 'axios';


const Feedback = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    uploadedFiles: [],
    buttonText: "送信",
    uploadPhotosButtonText: "アップロード"
  });

  const {
    name,
    email,
    message,
    phone,
    uploadedFiles,
    buttonText,
    uploadPhotosButtonText
  } = values;

  // destructure env variables
  const {
    REACT_APP_API,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_SECRET
  } = process.env;

  // event handler

  const handleChange = taregtName => event => {
    // targetNameがinputのonChangeで選んでいる要素のこと
    // input nameをchangeすると[name]が取れて、それがsetValuesによって新しく書き換わっている
    console.log(taregtName, "taregtName");

    setValues({ ...values, [taregtName]: event.target.value });
  };

  // functions
  const handleSubmit = event => {
    event.preventDefault();
    console.log("submit");
    setValues({ ...values, buttonText: "...送信中" });
    // send to backend for Email

    axios({
      method: "POST",
      url: `${REACT_APP_API}/feedback`,
      data: { name, email, phone, message, uploadedFiles }
    })
      .then(response => {
        console.log("feedback submit response", response);
      })
      .catch(error => {
        console.log("feedback submit error", error.response);
      });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET,
        tags: ["photos"]
      },
      function(error, result) {
        console.log(result);
        setValues({ ...values, uploadedFiles: result, uploadPhotosButtonText: `${result ? result.length: 0} 写真アップロード完了`})
      }
    );
  }

  // fc components
  const feedbackForm = () => (
    <>
      <div className="form-group pt-5">
        <button onClick={uploadWidget} className="btn btn-outline-secondary btn-block p-5">
          {uploadPhotosButtonText}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">詳細</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
          ></textarea>
        </div>
        <div className="from-group">
          <label className="text-muted">名前</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange("name")}
            value={name}
            required
          />
        </div>
        <div className="from-group">
          <label className="text-muted">Eメール</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange("email")}
            value={email}
            required
          />
        </div>
        <div className="from-group">
          <label className="text-muted">電話番号</label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange("phone")}
            value={phone}
            required
          />
        </div>

        <button className="btn btn-outline-primary btn-block mt-5 p-5">
          {buttonText}
        </button>
      </form>
    </>
  );

  return <div>{feedbackForm()}</div>;
};

export default Feedback;
