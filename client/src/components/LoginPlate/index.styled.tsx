import React, { FC } from 'react';
import styled from 'styled-components';

export const ColumnFlex = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  width: 80%;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme ?? '#ffffff'};
  color: ${(props) => props.color ?? '#000000'};
  border: ${(props) => (isWhite(props.theme) ? 'thin solid #888' : 'none')};
  border-radius: 5px;
  cursor: pointer;
`;

function isWhite(theme: string | undefined) {
  if (theme === undefined) return true;
  if (theme === '#ffffff') return true;
  if (theme === '#fff') return true;
  if (theme === 'white') return true;
  return false;
}

type LoginButtonProps = {
  IconComponent: FC;
  text: string;
  color: string;
  theme: string;
  onClick?: () => void;
};

const LoginButton: FC<LoginButtonProps> = (props) => {
  const { IconComponent, text, color, theme, onClick } = props;

  return (
    <Button theme={theme} color={color} onClick={onClick}>
      <IconComponent />
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span>{text}</span>
      </div>
    </Button>
  );
};

export default LoginButton;
