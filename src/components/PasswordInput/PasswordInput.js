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
  )
}

export default PasswordInput;
