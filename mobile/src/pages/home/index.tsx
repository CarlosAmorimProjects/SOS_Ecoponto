import React from 'react';
import { FontAwesome5 as Icon} from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

    function handleNavigateToPoints () {
        navigation.navigate('Points')
    }

    function handleNavigateAdmin () {
        navigation.navigate('Admin');
    }

    return (
        <ImageBackground 
         source={require('../../assets/home-background.png')}
         style={styles.container}
         imageStyle={{width: 274, height:368}}
         >
            <View style={styles.icon}>
            <TouchableOpacity style={styles.icon} onPress={handleNavigateAdmin}>
                    <Icon name='tools' size={20} color='#34cb79'/>
            </TouchableOpacity>
            </View>
            <View style={styles.main}>
            <Image style={styles.logo} source={require('../../assets/logo3.png')} />
            <Text style={styles.description}> Tem residuos renováveis* que não podem ser colocados no ecoponto mais próximo ?</Text>
            <Text style={styles.description2}> Coloque junto ao ecoponto, utilize a App para notificar o local e qual o tipo de residuos, e nós recolhemos.</Text>
            </View>    
        <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
                <Text>
                    <Icon name='arrow-right' color='#FFF' size={24} />
                </Text>
            </View>
            <Text style={styles.buttonText}>
                Entrar
            </Text>
            </RectButton>
            <Text style={styles.description3}> *Baterias, Componentes electrónicos, Lâmpadas, Óleo doméstico, Papelão, Residuos orgânicos.</Text>
        </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },

    icon: {
        marginLeft: 137,
        marginTop: 10
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 50,
    },

    logo: {
      marginTop: -20,

    },
  
    description: {
      color: 'green',
      fontSize: 25,
      marginTop: 98,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 300,
      lineHeight: 24,
    },

    description2: {
      color: '#6C6C80',
      fontSize: 20,
      marginTop: 62,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 300,
      lineHeight: 20,
    },

    description3: {
      color: '#6C6C80',
      fontSize: 10,
      marginTop: 52,
      marginBottom: -20,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 290,
      lineHeight: 14,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
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

export default Home;