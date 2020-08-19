import React, { useEffect, useState } from 'react';
import { Feather as Icon, FontAwesome5  } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    freguesia: string;
    rua: string;
  };
  items: {
    title: string;
  }[];
}
const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);  

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
      api.get(`points/${routeParams.point_id}`).then(response => {
        setData(response.data);
      })
    }, []);

    function handleNavigateBack () {
      navigation.reset({
        index: 0,
        routes: [{ name: "AdminPoints" }],
      });
    }

    if (!data.point) {
      return null;
    }

    function handleDeletePoint () {

      api.delete(`points/${routeParams.point_id}`).then(response => {
        
          Alert.alert(
            '',
            'Ponto de recolha apagado');
          handleNavigateBack();
      })
    }

    return (
        <SafeAreaView style={{ flex:1 }}>
            <View style = {styles.container}>
                  <TouchableOpacity onPress={handleNavigateBack}>
                          <Icon name='arrow-left' size={20} color='#34cb79'/>
                      </TouchableOpacity>
                  
                  <Text style={styles.description}>
                      Foram colocados os seguintes residuos neste ponto de recolha :
                  </Text>
                    {data.items.map (item => (
                      <TouchableOpacity
                      style={styles.listItems}
                        key= {String(routeParams.point_id)}
                        >
                        <Icon style={styles.itemIcon} name='arrow-right' size={20} color='#34cb79'/>
                        <Text style={styles.pointItems}>{item.title}</Text>
                      </TouchableOpacity>
                    ))}

                  <RectButton style={styles.button} onPress={handleDeletePoint}>
                      <View style={styles.buttonIcon}>
                          <Text>
                              <Icon name='trash-2' color='#FFF' size={24} />
                          </Text>
                      </View>
                      <Text style={styles.buttonText}>
                          Apagar ponto de recolha
                      </Text>
                  </RectButton>
                </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 80,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },

    listItems: {
      flexDirection: 'row'
    },

    itemIcon: {
      marginTop: 30
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop:29,
      color: '#6C6C80'
    },

    description: {
      marginTop: 30,
      fontSize: 20,
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      backgroundColor: '#34CB79',
      height: 40,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 80,
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

export default Detail;

