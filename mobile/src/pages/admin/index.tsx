import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert, Picker, Image, TextInput } from 'react-native';
import { Feather as Icons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


const Admin = () => {

    const [value, onChangeText] = React.useState('');
    const navigation = useNavigation();

    function handleNavigateBack () {
      navigation.goBack();
    }

    function handleNavigateToPoints () {
      console.log({value});

      if (value === '1') {
        navigation.navigate('AdminPoints');
      }

      else {
        Alert.alert(
          'Aviso',
          'Palavra passe administrador errada');
      }
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={handleNavigateBack}>
                    <Icons style={styles.icon}
                    name='arrow-left' size={20} color='#34cb79'/>
                </TouchableOpacity>
            <Image style={styles.logo} source={require('../../assets/logo3.png')} />

            <TextInput
              style={styles.textInput}
              onChangeText={text => onChangeText(text)}
              value={value}
              autoFocus={true}
            />

            <View>
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icons name='arrow-right' color='#FFF' size={24} />
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
                </RectButton>
            </View>
        </View>
    );
}

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
        marginLeft: 55,
        marginTop:-10
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: -130,
      marginLeft: 70
    },

    logo: {
      marginTop: 50,
      marginLeft: 70

    },
  
    description: {
      color: 'green',
      fontSize: 22,
      marginTop: 28,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 300,
      lineHeight: 24,
    },

    textInput: {
      marginTop: 80,
      marginLeft: 70,
      height: 40, 
      width: 200, 
      borderColor: 'gray',
      borderWidth: 3,
      alignItems: 'center',
      textAlign: 'center'
    },

    button: {
      backgroundColor: '#34CB79',
      height: 40,
      width: 170,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 58,
      marginLeft: 85,
    },
  
    buttonIcon: {
      height: 40,
      width: 40,
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

export default Admin;

