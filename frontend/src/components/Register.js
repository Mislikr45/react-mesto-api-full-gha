import Form from "./Form";
import { Link } from "react-router-dom";

export default function Register({onRegister}) {

  return (
    <Form
    onFunction={onRegister}
    buttonText="Зарегистрироваться"
    titleText="Регистрация"
  >

  <div className="form__signin">
        <p className="form__subtitle">           
          Уже зарегистрированы?
        </p>
        <Link to="/sign-in" className="form__login-link">
          Войти
        </Link>
      </div>
</Form>
  )  
}