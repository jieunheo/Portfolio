import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { login, signup } from "../../fbace";
// import AuthContext from "../context/auth-context";


const Login = ({ userId, setUserId }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordOkRef = useRef();

  useEffect(() => {
    if(userId !== null) navigate('/');
  }, [userId]);

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
  }

  const signupHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;

    if(email.value === '') {
      alert('이메일을 입력하세요');
      email.focus();
      console.log(emailRef);
      return;
    }
    if(password.value === '') {
      alert('비밀번호를 입력하세요');
      password.focus();
      return;
    }

    if(event.target[2].name === 'login') {
      login(email.value, password.value)
        .then(result => {
          console.log(result);
          setUserId(result.uid);
        });
    } else if(event.target[3].name === 'signup') {
      if(passwordOkRef.current.value === '' || password.value !== passwordOkRef.current.value)  {
        alert('비밀번호가 일치하지 않습니다');
        passwordOkRef.current.focus();
        return;
      }

      signup(email.value, password.value)
        .then(result => {
          console.log(result);
          setUserId(result.uid);
        });
    }
  }

  return (
    <div className='login-wrap'>
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>
      <form className='login-form' onSubmit={signupHandler}>
        <input ref={emailRef} placeholder='email' className='login-email' type='email' />
        <input ref={passwordRef} placeholder='password' className='login-password' type='password' />
        {!isLogin && (
        <input ref={passwordOkRef} placeholder='password ok' className='login-password login-password-ok' type='password' />
        )}
        <button className='btn' name={isLogin ? 'login' : 'signup'} type='submit'>{isLogin ? 'login' : 'signup'}</button>
        <button className='btn toggle' type='button' onClick={toggleLogin}>{isLogin ? 'to signup' : 'to login'}</button>
      </form>
    </div>
  )
}

export default Login;