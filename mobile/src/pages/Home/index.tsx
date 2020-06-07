import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { AppLoading } from 'expo';
import { Feather as Icon } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonIcon,
  ButtonText,
  Select,
} from './styles';

import logo from '~/assets/logo.png';

const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function handleNavigationToPoints() {
    navigation.navigate('Points', { city, uf });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <Main>
          <View>
            <Image source={logo} />
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coletas eficientes
            </Description>
          </View>
        </Main>
        <Footer>
          <Select
            placeholder="Digite a uf"
            value={uf}
            onChangeText={setUf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <Select
            placeholder="Digite a cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          />
          <Button onPress={handleNavigationToPoints}>
            <ButtonIcon>
              <Icon name="arrow-right" color="#fff" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
