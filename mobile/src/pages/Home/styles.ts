import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import homeBackground from '~/assets/home-background.png';

export const Container = styled.ImageBackground.attrs({
  source: homeBackground,
  imageStyle: { width: 274, height: 368 },
})`
  padding: 32px;
  flex: 1;
  background: #f0f0f5;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: 64px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 16px;
  font-family: 'Roboto_400Regular';
  max-width: 260px;
  line-height: 24px;
`;

export const Footer = styled.View``;
export const Select = styled.TextInput`
  height: 60px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 24px;
  font-size: 16px;
`;

export const Input = styled.TextInput`
  height: 60px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 24px;
  font-size: 16px;
`;

export const Button = styled(RectButton)`
  background: #34cb79;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;

export const ButtonIcon = styled.View`
  height: 60px;
  width: 60px;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;
