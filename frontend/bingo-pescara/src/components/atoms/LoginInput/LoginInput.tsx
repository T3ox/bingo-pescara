import React, { useState } from 'react';
import Button from '../Button/Button';
import './styles.scss';
import type Props from './types';

const LoginInput: React.FC<Props> = ({ placeholder, rightIcon, isPassword, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(isPassword);

  return (
    <div className="container-fluid w-75 mb-3">
      <div className="row flex-nowrap">
        <div className="input-group align-items-center border rounded-pill bg-white">
          <input
            type={showPassword ? 'password' : 'text'}
            className="input-field border-0"
            placeholder={placeholder}
            onChange={(event) => {
              onChangeText(event.target.value);
            }}
          />
          <Button
            className={`${isPassword ? '' : 'clickable'} btn border-0 bg-transparent`}
            handle={() => {
              setShowPassword(isPassword ? !showPassword : showPassword);
            }}>
            {rightIcon}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginInput;
