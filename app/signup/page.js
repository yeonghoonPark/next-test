"use client";

import { useEffect, useRef, useState } from "react";

export default function SignUpPage() {
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassordRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const checkEmptyString = () => {
    if (nameVal === "") {
      alert("이름을 입력해주세요.");
      nameRef.current.focus();
      return;
    } else if (emailVal === "") {
      alert("이메일을 입력해주세요.");
      emailRef.current.focus();
      return;
    } else if (passwordVal === "") {
      alert("비밀번호를 입력해주세요.");
      passwordRef.current.focus();
      return;
    } else if (confirmPasswordVal === "") {
      alert("비밀번호를 확인을 입력해주세요");
      confirmPassordRef.current.focus();
    }
  };

  const checkPassword = () => {
    if (passwordVal !== confirmPasswordVal) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다, 확인해주세요.");
      passwordRef.current.focus();
      return;
    }
  };

  const onHandleBtn = () => {
    checkEmptyString();
    checkPassword();
  };

  return (
    <div className='container sign-up-page'>
      <h1 className='page-title'>SignUp</h1>
      <form action='/api/signup/insert' method='POST'>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={nameVal}
            ref={nameRef}
            onChange={(e) => setNameVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={emailVal}
            ref={emailRef}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={passwordVal}
            ref={passwordRef}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            value={confirmPasswordVal}
            ref={confirmPassordRef}
            onChange={(e) => setConfirmPasswordVal(e.target.value)}
          />
        </div>
        <button className='btn-large' type='submit' onClick={onHandleBtn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}