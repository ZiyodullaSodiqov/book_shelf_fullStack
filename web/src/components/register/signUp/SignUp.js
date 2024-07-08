import { useState } from 'react';
import SignUpForm from './SignUpForm';
import LogIn from './LogIn';

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      {isSignUp ? (
        <SignUpForm toggleForm={toggleForm} />
      ) : (
        <LogIn toggleForm={toggleForm} />
      )}
    </div>
  );
};


export default SignUp;
