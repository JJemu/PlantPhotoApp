import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { BodyText, AppTheme } from '../theme/Theme';

type Props = {
  onPress: () => void;
  title: string;
  icon?: JSX.Element;
  variant?: 'default' | 'danger';
};

const ButtonContainer = styled(Pressable)<{ isPressed: boolean; variant: 'default' | 'danger' }>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isPressed, variant }) => {
    if (variant === 'danger') {
      return isPressed ? '#8B0000' : '#B22222';
    }
    return isPressed ? theme.color.primaryVariant : theme.color.primary;
  }};
  padding-vertical: 14px;
  padding-horizontal: 16px;
  margin-horizontal: 10px;
  border-radius: 30px;
  transform: ${({ isPressed }) => (isPressed ? 'scale(0.99)' : 'scale(1)')};
`;

const ItemsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled(BodyText)`
  color: ${({ theme }) => theme.color.white};
`;

export const Button = ({ onPress, title, icon, variant = 'default' }: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  const theme = new AppTheme();

  return (
    <ThemeProvider theme={theme}>
      <ButtonContainer
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        isPressed={isPressed}
        variant={variant}
      >
        <ItemsWrapper>
          {icon}
          <Title>{title}</Title>
        </ItemsWrapper>
      </ButtonContainer>
    </ThemeProvider>
  );
};
