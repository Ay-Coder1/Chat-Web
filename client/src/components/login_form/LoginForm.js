import { useState, useRef } from 'react';

// components / styled-components
import { SectionContainer } from '../styles/SectionContainer.styled';
import {
   AnimatedBorder,
   StyledLoginForm,
   LoginButton,
   ErrorMessage,
   RegisterLink,
} from './LoginForm.styled';
import ThemeButton from '../Theme/ThemeButton';

// hooks
import useLogin from '../../hooks/useLogin';
import useConditionalListener from '../../hooks/useConditionalListener';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// route
import ROUTES from '../../routes/routes';

const LoginForm = () => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });
   const { login, errorMessage, setErrorMessage } = useLogin();
   const { email, password } = formData;
   const [showPassword, setShowPassword] = useState(false);
   const passwordInput = useRef(null);

   const handleSubmit = async e => {
      e.preventDefault();

      await login(email, password);
   };

   const handleKeyUp = e => {
      if (e.key === 'Enter') {
         handleSubmit(e);
      }
   };

   const getFormData = e => {
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
      setErrorMessage(null);
   };

   const handlePointerDown = e => {
      e.preventDefault();
      setShowPassword(true);
      passwordInput.current.type = 'text';
   };

   const handlePointerUp = e => {
      e.preventDefault();
      setShowPassword(false);
      passwordInput.current.type = 'password';
   };

   useConditionalListener('pointerup', handlePointerUp, showPassword);

   return (
      <SectionContainer>
         <ThemeButton />
         <AnimatedBorder error={errorMessage}>
            <StyledLoginForm
               onSubmit={handleSubmit}
               onKeyUp={handleKeyUp}
               error={errorMessage}
               showPassword={showPassword}
            >
             <h1>Messenger <img src"data:image/jpeg;base64,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" width="100px" ></h1>
                  <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={email}
                     onChange={getFormData}
                     autoFocus
                  ></input>
               </div>
               <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={getFormData}
                        ref={passwordInput}
                     ></input>
                     <button
                        onClick={e => e.preventDefault()}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                     >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                     </button>
                  </div>
               </div>
               <LoginButton>Log In</LoginButton>
               <div className="err-msg-container">
                  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
               </div>
               <RegisterLink>
                  <p>
                     New here?
                     <a href={`${ROUTES.SIGNUP}`}>
                        &#10094;Create account for free&#10095;
                     </a>
                  </p>
               </RegisterLink>
            </StyledLoginForm>
         </AnimatedBorder>
      </SectionContainer>
   );
};

export default LoginForm;
