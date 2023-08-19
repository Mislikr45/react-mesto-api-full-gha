import React, { useState } from "react";

function Form({ onFunction, buttonText, titleText, children}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onFunction({ email, password });
  };

  return (
    <div className="form">
      <p className="form__title">{titleText}</p>
      <form onSubmit={handleSubmit} className="form__form">
        <input
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          className="form__input"
        />

        <input
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="form__input"
        />

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="form__button">
           {buttonText}
        </button>
      </form>
      {children}      
    </div>
  );
};

export default Form;
