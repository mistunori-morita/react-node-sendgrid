import React, { useState } from "react";

const Feedback = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    uploadedFiles: [],
    buttonText: "送信",
    uploadPhotosButtonText: "Upload files"
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

  // event handler

  const handleChange = taregtName => event => {
    // targetNameがinputのonChangeで選んでいる要素のこと
    // input nameをchangeすると[name]が取れて、それがsetValuesによって新しく書き換わっている
    console.log(taregtName, "taregtName");

    setValues({ ...values, [taregtName]: event.target.value });
    console.table({ name, email, phone, message, uploadedFiles });
  };

  // functions
  const handleSubmit = event => {
    event.preventDefault();
    console.log("submit");
    setValues({ ...values, buttonText: "...送信中" });
    // send to backend for Email
  };

  // fc components
  const feedbackForm = () => (
    <>
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

        <button className="btn btn-outline-primary btn-block">
          {buttonText}
        </button>
      </form>
    </>
  );

  return <div>{feedbackForm()}</div>;
};

export default Feedback;
