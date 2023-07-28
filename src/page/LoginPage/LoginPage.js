import React, { useEffect, useState } from 'react';
import './LoginPage.css'
import { UserOutlined, InfoCircleOutlined, KeyOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { userActions } from '../../Redux/_actions';
import { loginAPI } from '../../Api/Service/auth.service';
function LoginPage() {
   
   const [data, setData] = useState({
      username: '',
      password: ''
   })
   const [formErrors, setFormErrors] = useState({});
   const dispatch = useDispatch()
   const navigate = useNavigate();

   function handleChange(e) {
      const { name, value } = e.target;
      setData(data => ({ ...data, [name]: value }))
   }
   const hasSpecialCharacters = (input) => {
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
      return regex.test(input);
   };
   function handleSubmit(e) {
      e.preventDefault()
      const errors = {};
      if (hasSpecialCharacters(data.username)) {
         errors.username = 'Username cannot contain special characters.'
      }
      if (Object.keys(errors).length > 0) {
         setFormErrors(errors);
      }
      else {
         if (!data.username.trim() || !data.password.trim()) {
            const messageWarn = 'You need to enter all the information!!!'
            toast.warn(messageWarn, { autoClose: 2000 })
         }
         else {
            loginAPI('accounts/login', data).then((res) => {
               dispatch(userActions.login(data))
               toast.success(res.data.message, { autoClose: 2000 })
               navigate('/')
            }).catch((error) => {
               toast.error(error.response.data.message, { autoClose: 2000 })
            })
         }
      }
   }
   useEffect(() => {
      dispatch(userActions.logout());
   }, []);
   return (
      <>
         <div className='loginPage'>
            <form onSubmit={handleSubmit} className='loginForm' >
               <div className='title'>LOGIN</div>
               <div className='input-item'>
                  <Input style={{ padding: '10px', fontSize: '15px' }}
                     placeholder="Enter your account"
                     prefix={<UserOutlined />}
                     suffix={<InfoCircleOutlined
                        style={{ color: formErrors.username ? 'red' : '' }}
                     />}
                     name='username'
                     onChange={handleChange}
                  />
                  {formErrors.username && <div className='error-message'>{formErrors.username}</div>}
               </div>
               <div className='input-item'>
                  <Input.Password style={{ padding: '10px', fontSize: '15px' }}
                     placeholder="Enter your password"
                     prefix={<KeyOutlined />}
                     iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                     name='password'
                     onChange={handleChange}
                  />
               </div>
               <div className='login-btn-wrapper'>
                  <input className='login-btn' type='submit' value={"LOGIN"} />
               </div>
               <div className='register'>
                  <p>Do you have any accounts ?
                     <Link to={"/register"} className='no-underline'>
                        <span> Sign up</span>
                     </Link></p>
               </div>
            </form>
         </div>
      </>
   )
}

export default LoginPage
