import React from 'react';
import { SafeAreaView, 
    Text, 
    Image, 
    TouchableOpacity,
    StyleSheet,
    Dimensions,  } from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
            Gerencie {'\n'}
            suas plantas de{'\n'}
            forma fácil
            </Text>

            <Image 
            source={wateringImg} 
            style={styles.image} 
            resizeMode={'contain'}
            />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.7}
                onPress={handleStart}
            >
                   <Feather 
                   name="chevron-right"
                   style={styles.buttonIcon}
                   />
                
            </TouchableOpacity>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 80,
        fontFamily: fonts.heading,
        lineHeight: 38
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 50,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
})