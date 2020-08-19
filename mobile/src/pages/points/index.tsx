import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Coordinate, Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';
import { ppid } from 'process';

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  freguesia: string;
  latitude: number;
  longitude: number;
}

const Points = () => {

    const [items, setItems] = useState<Item[]>([]);
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition ] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>  ([0,0]);
    const [points, setPoints] = useState<Point[]>([]);

    useEffect (() => {
      async function loadPosition () {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Aviso',
            'Sem autorização para aceder a localização do utilizador');
          return;
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;

        setInitialPosition([
          latitude,
          longitude
        ])

      }

      loadPosition(); 

    }, []);

    useEffect (() => {
      api.get('items').then(response => {
        setItems(response.data);
      })
    }, []);

    function handleSelectedItem (id: number) {
      const alreadySelected = selectedItems.findIndex( item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => item !== id);

        setSelectedItems(filteredItems);

      }else {
        setSelectedItems([ ...selectedItems, id ]);
      }
    }

    function handleNavigateBack () {
        navigation.goBack();
      }

    function handleMapClick (nativeEvent: { coordinate: any; position?: import("react-native-maps").Point; }) {

          setSelectedPosition([
          nativeEvent.coordinate.latitude,
          nativeEvent.coordinate.longitude        
          ]);

          console.log(selectedPosition[0]);
          console.log(selectedPosition[1]);
          }

      async function handleSubmit () {

              const [latitude, longitude] = selectedPosition;
              const items = selectedItems;

              const data = new FormData();

                  data.append('latitude', String(latitude));
                  data.append('longitude', String (longitude));
                  data.append('items', items.join(','))
                  
                  if (latitude === 0 ) {
                      Alert.alert(
                        'Aviso',
                        'A localizaçao tem de ser introduzida');
                  }

                  else if ( Array.isArray(items) && !items.length) {
                      Alert.alert(
                        'Aviso',
                        'Selecione o tipo de residuo a recolher');
                  }

                  else {
                      await api.post('points', data);
                      Alert.alert(
                        '',
                        'Registo efectuado');
                      handleNavigateBack();
                  }
          }


    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#34cb79'/>
                </TouchableOpacity>

                <Text style={ styles.description}>
                    Registe o ponto de recolha no mapa:
                </Text>
                <View style={styles.mapContainer}>
                  { initialPosition[0] !== 0 && 
                    (
                      <MapView 
                        style={styles.map} 
                        initialRegion={{
                          latitude: initialPosition[0],
                          longitude: initialPosition[1],
                          latitudeDelta: 0.1,
                          longitudeDelta: 0.1
                        }}
                        onPress={e=> handleMapClick(e.nativeEvent)}
                      >
                      <Marker coordinate ={{
                        latitude: selectedPosition[0],
                        longitude: selectedPosition[1]
                      }}
                      title={'Ponto de Recolha'}
                      >
                      </Marker>
                      
                    </MapView>
                    )
                    }
                  </View>

                  <Text style={ styles.description3}>
                          Selecione quais os residuos depositados:
                   </Text>         

                  <View style={styles.itemsContainer}>
                    <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20}}
                    >
                      { items.map(item => (
                        <TouchableOpacity
                        key={String(item.id)} 
                        style={[
                          styles.item,
                          selectedItems.includes(item.id) ? styles.selectedItem : {}
                        ]} 
                        onPress={() => handleSelectedItem(item.id)}
                        activeOpacity={0.6}
                        >
                        <SvgUri width={22} height={22} uri= {item.image_url} />
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    
                </View>
                
                <RectButton style={styles.button} onPress={handleSubmit}>
                  <View style={styles.buttonIcon}>
                      <Text>
                          <Icon name='arrow-right' color='#FFF' size={24} />
                      </Text>
                  </View>
                  <Text style={styles.buttonText}>
                      Registar ponto de recolha
                  </Text>
                  </RectButton>

            </View>

            </>
            );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 14,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 10,
      fontFamily: 'Ubuntu_700Bold',
    },

    description2: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 24,
      fontFamily: 'Ubuntu_700Bold',
    },

    description3: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: -4,
      marginBottom: 13,
      fontFamily: 'Ubuntu_700Bold',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '90%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 6,
      marginBottom: 6,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 100,
      width: 100,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 6,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },

    button: {
      backgroundColor: '#34CB79',
      height: 40,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 12
    },
  
    buttonIcon: {
      height: 40,
      width: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }

  });


export default Points;