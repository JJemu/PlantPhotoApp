import styled from 'styled-components';
import { Text } from 'react-native';

type Size = {
  width: number;
  height: number;
};

type Colors = {
  readonly primary: string;
  readonly primaryVariant: string;
  readonly secondary: string;
  readonly black: string;
  readonly white: string;
  readonly gray: string;
  readonly lightGray: string;
};

type Sizes = {
  readonly s: Size;
  readonly m: Size;
  readonly l: Size;
  readonly xl: Size;
};

type Spaces = {
  readonly xs: number;
  readonly s: number;
  readonly m: number;
  readonly l: number;
  readonly xl: number;
};

type Theme = {
  readonly color: Colors;
  readonly size: Sizes;
  readonly space: Spaces;
};

export class AppTheme implements Theme {
  readonly color: Colors = {
    primary: '#66ccaf',
    primaryVariant: '#80c4b1',
    secondary: '#56cfe1',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#7B7B7B',
    lightGray: '#f0f0f0',
  };

  readonly size: Sizes = {
    s: { width: 12, height: 12 },
    m: { width: 16, height: 16 },
    l: { width: 24, height: 24 },
    xl: { width: 48, height: 48 },
  };

  readonly space: Spaces = {
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
  };
}

export const HeadingText = styled(Text)`
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
`;

export const DetailText = styled(Text)`
  font-size: 10px;
  font-weight: normal;
  line-height: 16px;
`;

export const BodyText = styled(Text)`
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
`;
