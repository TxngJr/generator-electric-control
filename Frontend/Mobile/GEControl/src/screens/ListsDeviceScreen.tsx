import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LogoComponents from '../components/LogoComponent'
import { listMicroControllerInterFace } from '../interfaces/microControllerInterFace';
import { getsList } from '../apis/microControllerAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {}

const ListsDeviceScreen = (props: Props) => {
    const [listMicroController, setListMicroController] = useState<listMicroControllerInterFace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const loadNextPage = async () => {
        const token: string | null = await AsyncStorage.getItem('token');
        if(!token){
            return null;
        }
        const nextPage: number = currentPage + 1;
        const data: { items: listMicroControllerInterFace[] } = await getsList(token, nextPage);
        setListMicroController([...listMicroController, ...data.items]); // Concatenate new items to the existing array
        setCurrentPage(nextPage);
        setLoading(false);
    };

    useEffect(() => {
        loadNextPage();
    }, []);

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (!loading) {
                setLoading(true);
                loadNextPage();
            }
        }
    };

    const renderMicroControllerItems = () => {
        return listMicroController.map((item) => (
            <TouchableOpacity key={item._id}>
                <View style={{ backgroundColor: '#73CFF6', width: 'auto', height: 'auto', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#FFFFFF', width: 'auto', alignItems: 'center', borderRadius: 10, marginBottom: 6 }}>
                        <Text style={[styles.text, { fontSize: 48 }]}>{item.microControllerName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6 }}>
                        <View style={[styles.containerListChildren, { marginRight: 6 }]}>
                            <Text style={[styles.text, { fontSize: 40 }]}>ระบบ</Text>
                        </View>
                        <View style={[styles.containerListChildren, { flex: 2 }]}>
                            <Text style={[styles.text, { fontSize: 40 }]}>{item.systemAC ? 'หลัก' : 'รอง'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[styles.containerListChildren, { marginRight: 6 }]}>
                            <Text style={[styles.text, { fontSize: 40 }]}>ค่าไฟ</Text>
                        </View>
                        <View style={[styles.containerListChildren, { flex: 2 }]}>
                            <Text style={[styles.text, { fontSize: 40 }]}>{item.EnergyACPrimary * 7}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <LogoComponents size={150} />
            </View>
            <ScrollView style={styles.containerList} onScroll={handleScroll} scrollEventThrottle={16}>
                {renderMicroControllerItems()}
            </ScrollView >
        </View >
    )
}

export default ListsDeviceScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 20,
        backgroundColor: '#F5F8FF'
    },
    containerLogo: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    text: {
        fontFamily: 'THSarabun Bold',
        color: '#000000'
    },
    containerList: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    containerListChildren: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 'auto',
        width: 'auto',
        alignItems: 'center',
        borderRadius: 10
    },
});