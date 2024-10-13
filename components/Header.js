import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TourGuideZoneByPosition } from 'rn-tourguide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const responsive = Dimensions.get('window').width

const Header = ({zoomIn, zoomOut, corner}) => {
    return (
        <SafeAreaView style={{zIndex: 5}}>
        <StatusBar backgroundColor='#202020' style='light'/>
        <View style={styles.container}>
            <View style={styles.containerItem}>
            <TourGuideZoneByPosition
                zone={5}
                text="Tekan tombol ini untuk zoom"
                isTourGuide
                shape='rectangle'
                top={30} // Sesuaikan dengan posisi tombol kamera
                left={0} // Sesuaikan dengan posisi tombol kamera
                width={100} // Sesuaikan dengan lebar tombol kamera
                height={50}
            />
                <View>
                <TouchableOpacity onPress={zoomOut} style={{width : responsive * 0.13, justifyContent : 'center', alignItems : 'center'}}>
                    <Ionicons name="remove-outline" color="#fefefe" size={responsive * 0.06}/>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={zoomIn} style={{width : responsive * 0.12, justifyContent : 'center', alignItems : 'center'}}>
                    <Ionicons name="add-outline" color="#fefefe" size={responsive * 0.06}/>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container : {
        height : responsive * 0.17,
        backgroundColor : '#202020',
        paddingHorizontal : responsive * 0.04,
        justifyContent : 'space-between',
        flexDirection :'row',
        paddingVertical : responsive * 0.032,
        zIndex : 6
    },
    containerItem : {
        backgroundColor : '#303032',
        paddingVertical : 0,
        width : responsive*0.25,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : responsive * 0.03
    },
    containerDownload : {
        backgroundColor : '#303032',
        paddingHorizontal : responsive * 0.03,
        borderRadius : responsive * 0.04,
        width : responsive * 0.2,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : responsive * 0.03
    }
})