import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import * as Location from 'expo-location';

import api from '~/services/api';

import {
  Container,
  Title,
  Description,
  MapContainer,
  Map,
  MapMarker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer,
  ItemsScroll,
  Item,
  ItemTitle,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  city: string;
  uf: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosintion, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooopsss. Precisamos de sua permissão para obter a sua localização'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);

  useEffect(() => {
    async function loadItems() {
      const { data } = await api.get('items');
      setItems(data);
    }

    loadItems();
  }, []);

  useEffect(() => {
    async function getPoints() {
      const { data } = await api.get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      });

      setPoints(data);
    }

    getPoints();
  }, [routeParams.city, routeParams.uf, selectedItems]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleSelectItem(id: number) {
    const itemsSelected = [...selectedItems];
    const filteredItemsIndex = itemsSelected.findIndex(
      (item: number) => id === item
    );
    if (filteredItemsIndex >= 0) {
      const newItems = itemsSelected.filter((item: number) => item !== id);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...itemsSelected, id]);
    }
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Title>😀 Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>

        {initialPosintion[0] !== 0 && (
          <MapContainer>
            <Map
              initialRegion={{
                latitude: initialPosintion[0],
                longitude: initialPosintion[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <MapMarker
                  key={String(point.id)}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage
                      source={{
                        uri: point.image_url,
                      }}
                    />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          </MapContainer>
        )}
      </Container>
      <ItemsContainer>
        <ItemsScroll>
          {items.map((item) => (
            <Item
              key={String(item.id)}
              selected={selectedItems.includes(item.id)}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ItemsScroll>
      </ItemsContainer>
    </>
  );
};

export default Points;
