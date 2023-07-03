import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AuthForm from './AuthForm';

function Login ({ handleLoginSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  function handleSubmit (evt) {
    evt.preventDefault();
    const { email, password } = formValues
    handleLoginSubmit(email, password)
  }

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  
  return (
    <>
      <Header>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header>
      <AuthForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onChange={handleChange}
        handleSubmit={handleSubmit}
        formValues={formValues}
        autoComplete="current-password"
      >
      </AuthForm> 
    </>
  )
}

export default Login;