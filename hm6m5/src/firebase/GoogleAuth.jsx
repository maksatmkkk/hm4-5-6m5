import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '../store/slices/AuthSlice';
import GoogleButton from 'react-google-button';

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const signInWithGoogleHandler = async () => {
    if (!isLoading) {
      await dispatch(signInWithGoogle());
    }
  };

  return (
    <div>
      {!isLoggedIn && <GoogleButton onClick={signInWithGoogleHandler} />}
      {isLoggedIn && <p>User logged in!</p>}
    </div>
  );
};

export default GoogleAuth;
