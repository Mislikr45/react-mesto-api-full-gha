import Form from "./Form";

export default function Login ({onLogin}) {

  return (
    <Form
    onFunction={onLogin}
    buttonText="Войти"
    titleText="Вход"   
  />
  )  
}