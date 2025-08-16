import React from 'react';

export default interface Props {
  placeholder: string;
  isPassword?: boolean;
  rightIcon?: React.ReactElement;
  onChangeText: (value: string) => void;
}
