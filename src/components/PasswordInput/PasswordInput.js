import React, { useState } from 'react';


const PasswordInput = (props) => {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  function toggleMask(){
    setPasswordIsMasked(!passwordIsMasked);
  } 
  
  return (
    <input 
    {...props}
        type={passwordIsMasked ? 'password' : 'text'}
      />
    // some sort of adornment goes heres
    // w/ onClick={toggleMask}
  )
}

export default PasswordInput;
