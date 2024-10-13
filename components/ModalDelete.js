import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const responsive = Dimensions.get('window').width
export default function ModalDelete({ isVisible, onClose , onDelete}) {
    return (
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose} 
                animationIn={"zoomIn"} 
                animationOut={"zoomOut"}
                style={{ alignItems: 'center' }}
                useNativeDriver={true} 
            >
                <View style={{ padding : 12,minHeight : responsive * 0.5, minWidth : responsive*0.7, backgroundColor : '#fff', borderRadius : 12 , alignItems : 'center'}}>
                    <Text style={{fontWeight : 'bold', fontSize : responsive*0.04, color : 'red'}}>Hapus Data</Text>
                    <Text style={{marginTop : 12}}>Apakah Anda Yakin Ingin Menghapus Seluruh Foto dan Mengambil Secara Ulang?</Text>
                    <View style={{flexDirection : 'row', marginTop : 20, gap : 12}}>
                        <TouchableOpacity style={{height : responsive*0.12, width : responsive*0.32, backgroundColor : 'lightgreen', justifyContent : 'center', alignItems : 'center', borderRadius : 12}} onPress={onClose}>
                            <Text style={{fontWeight : 'bold', color : '#fff'}}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height : responsive*0.12, width : responsive*0.32, backgroundColor : 'red', justifyContent : 'center', alignItems : 'center', borderRadius : 12}} onPress={onDelete}>
                            <Text style={{fontWeight : 'bold', color : '#fff'}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Modal>

    );
}
