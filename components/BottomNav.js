import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PDFConverter from './PdfConverter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TourGuideZoneByPosition, useTourGuideController } from 'rn-tourguide';
import { useEffect } from 'react';

const responsive = Dimensions.get('window').width

const BottomNav = ({onCameraPress, onGaleriPress,data, onSaveState, onGambarPress}) => {
    const { start, canStart} = useTourGuideController();
    useEffect(() => {
        const checkTourStatus = async () => {
        try {
            const tourStatus = await AsyncStorage.getItem('tourStatus');
            if (tourStatus !== 'shown') {
            if (canStart) {
                start();
                await AsyncStorage.setItem('tourStatus', 'shown');
            }
            }
        } catch (error) {
            console.error('Error checking tour status:', error);
        }
        };
    
        checkTourStatus();
    }, [canStart, start]);
    
    return (
        <View style={[styles.container]}>
            <View>
            <TourGuideZoneByPosition
                zone={1}
                text="Tekan tombol ini untuk membuka kamera"
                isTourGuide
                shape='circle'
                top={30} // Sesuaikan dengan posisi tombol kamera
                left={0} // Sesuaikan dengan posisi tombol kamera
                width={80} // Sesuaikan dengan lebar tombol kamera
                height={80}
            />
                <TouchableOpacity onPress={onCameraPress} style={styles.containerIcon}>
                    <Ionicons name='camera-outline' color='#fefefe' size={responsive * 0.06}/>
                    
                </TouchableOpacity>
                <Text style={{color : '#fff', marginTop : 10,  textAlign : 'center'}}>Kamera</Text>
            </View>
            <View>
                <TourGuideZoneByPosition
                        zone={4}
                        text="Tekan tombol ini untuk memilih dari galeri"
                        isTourGuide
                        shape='circle'
                        top={30} 
                        left={0} 
                        width={80}
                        height={80}
                    />
                    <TouchableOpacity  onPress={onGambarPress} style={styles.containerIcon}>
                        <Ionicons name='images' color='#fefefe' size={responsive * 0.06}/>
                    </TouchableOpacity>
                    <Text style={{color : '#fff', marginTop : 10, textAlign : 'center'}}>Galeri</Text>
            </View>
            <View>
                <TourGuideZoneByPosition
                    zone={2}
                    text="Tekan tombol ini untuk menampilkan sudut"
                    isTourGuide
                    shape='circle'
                    top={30} 
                    left={0} 
                    width={80}
                    height={80}
                />
                <TouchableOpacity  onPress={onGaleriPress} style={styles.containerIcon}>
                    <MaterialCommunityIcons name='ruler-square-compass' color="white" size={responsive * 0.06}/>
                </TouchableOpacity>
                <Text style={{color : '#fff', marginTop : 10,  textAlign : 'center'}}>Sudut</Text>
            </View>
            <View>
            <TourGuideZoneByPosition
                    zone={3}
                    text="Tekan tombol ini untuk melihat data dan untuk menyimpan pdf"
                    isTourGuide
                    shape='circle'
                    top={30} 
                    left={0} 
                    width={80}
                    height={80}
                />
                <PDFConverter data={data}/>
                </View>
            <View>
                <TourGuideZoneByPosition
                        zone={4}
                        text="Tekan tombol ini untuk acc data, lakukan pada setiap gambar"
                        isTourGuide
                        shape='circle'
                        top={30} 
                        left={0} 
                        width={80}
                        height={80}
                    />
                    <TouchableOpacity  onPress={onSaveState} style={styles.containerIcon}>
                        <Ionicons name='checkmark-outline' color='#fefefe' size={responsive * 0.06}/>
                    </TouchableOpacity>
                    <Text style={{color : '#fff', marginTop : 10, textAlign : 'center'}}>Simpan</Text>
            </View>
        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container : {
        justifyContent : 'space-between',
        backgroundColor : '#202020',
        height : responsive * 0.33,
        alignItems : 'center',
        zIndex : 5,
        flexDirection : 'row',
        paddingHorizontal : 12
    },
    containerIcon : {
        backgroundColor : '#303032',
        height : responsive * 0.16,
        width :  responsive * 0.16,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius :  responsive * 0.16
    },
    textIcon : {
        fontSize : responsive * 0.06, fontWeight : 'bold', color : '#fff'
    }
})