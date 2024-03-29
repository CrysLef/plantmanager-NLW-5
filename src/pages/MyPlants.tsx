import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert
} from 'react-native';

import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlants} from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover',`Deseja remover a ${plant.name}?`,
        [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlants(plant.id);
                        setMyPlants((oldData) => 
                            oldData.filter((item) => item.id != plant.id)
                        );

                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😢 ')
                    }
                }

            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoragered = await loadPlant();

            if(plantsStoragered.length > 0) {
                const nextTime = formatDistance(
                    new Date(plantsStoragered[0].dateNotification).getTime(),
                    new Date().getTime(),
                    { locale: ptBR }
                );

                setNextWatered(
                    `Não esqueça de regar a ${plantsStoragered[0].name} à ${nextTime}.`
                )

                setMyPlants(plantsStoragered);
            }else {
                setMyPlants([]);
            }
            setLoading(false);
        }

        loadStorageData();
    },[]);

    if(loading)
        return <Load />


    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image 
                source={waterdrop}
                style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                data={myPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <PlantCardSecondary 
                        data={item}
                        handleRemove={() => {handleRemove(item)}}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})