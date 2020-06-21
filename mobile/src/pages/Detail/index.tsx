import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';

import * as MailComposer from 'expo-mail-composer';

import api from '~/services/api';

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
} from './styles';

interface Params {
  point_id: number;
}

interface Point {
  point: {
    id: number;
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const pointParams = route.params as Params;

  const [point, setPoint] = useState<Point | null>();

  useEffect(() => {
    async function getPoint() {
      const { data } = await api.get(`points/${pointParams.point_id}`);
      const newPoint = data;
      newPoint.point = data.serializedPoint;
      setPoint(newPoint);
    }
    getPoint();
  }, [pointParams]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${point?.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }

  function handleComposerMail() {
    if (point) {
      MailComposer.composeAsync({
        subject: 'Interesse na coleta de resíduos',
        recipients: [point.point.email],
      });
    }
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage
          source={{
            uri: point?.point.image_url,
          }}
        />
        <PointName>{point?.point.name}</PointName>
        <PointItems>
          {point?.items.map((item) => item.title).join(', ')}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {point?.point.city}, {point?.point.uf}
          </AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" color="#fff" size={20} />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={handleComposerMail}>
          <Icon name="mail" color="#fff" size={20} />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </>
  );
};

export default Detail;
