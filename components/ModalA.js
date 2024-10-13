import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const responsive = Dimensions.get('window').width
export default function CustomModal({ isVisible, onClose, data , onCetak}) {

    return (
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose} 
                animationIn={"zoomIn"} 
                animationOut={"zoomOut"}
                style={{ alignItems: 'center' }}
                useNativeDriver={true} 
            >
                <View style={{ minHeight : responsive*0.5, minWidth : responsive*0.7, backgroundColor : '#fff', borderRadius : 12 , justifyContent:'center', alignItems : 'center', padding : 8}}>
                    {data.map((item, index) => (
                        <View key={index} style={{flexDirection : 'row-reverse', gap: 15}} >
                            <Text>{item.angle}°</Text>
                            <Text>{item.second}s</Text>
                        </View>
                    ))}
                            <TouchableOpacity style={{backgroundColor : 'red', width : responsive*0.6, padding : 8, borderRadius : 12, justifyContent : 'center', alignItems : 'center', marginTop : 16}}
                            onPress={onCetak}>
                                <Text style={{color: '#fff'}}>Cetak PDF</Text>
                            </TouchableOpacity>
                    
                </View>
            </Modal>

    );
}
