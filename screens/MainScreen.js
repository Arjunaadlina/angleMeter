import AngleMeter from '../components/AngleMeter'
import { useState, useEffect, useRef, useCallback } from 'react'
import { View, Alert, TouchableOpacity, Dimensions, Text, StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native'
import { Camera } from 'expo-camera/legacy';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAngle } from '../store/angleCtx';
import { Ionicons } from '@expo/vector-icons';
import ModalDelete from '../components/ModalDelete';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';


const responsive = Dimensions.get('window').width

const MainScreen = () => {
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [cornerisVisible, setCornerIsVisible] = useState(true)
    const [selectedBackground, setSelectedBackground] = useState([])
    const { angle, data, setData, setSs, galeri, setGaleri, ssGal, setSsGal } = useAngle();
    const [isVisible, setIsVisbile] = useState(false)
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [gambar , setGambar] =useState(false)
    const viewShotRef = useRef();
    const shotRef = useRef();
    const [currentImage, setCurrentImage] = useState(null);

    const captureScreenshotGaleri = useCallback(async () => {
        if (!permissionResponse) {
          Alert.alert('Permission Required', 'Please grant permission to take screenshots.');
          return;
        }
      
        if (permissionResponse.status !== 'granted') {
          const { status } = await requestPermission();
          if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need permission to take screenshots.');
            ToastAndroid.show('Akses ditolak', ToastAndroid.SHORT);
            return;
          }
        }
      
        if (shotRef.current) {
          try {
            const uri = await shotRef.current.capture();
            
            setSs(prevScreenshots => {
                const existingIndex = prevScreenshots.findIndex(
                  screenshot => screenshot.image === currentImage.image
                );
      
                const newScreenshot = {
                  image : uri,
                  second: ' - ',
                  angle: angle
                };
      
                if (existingIndex !== -1) {
                  // Check if angle has changed
                  if (prevScreenshots[existingIndex].angle !== angle) {
                    // Update existing screenshot
                    const updatedScreenshots = [...prevScreenshots];
                    updatedScreenshots[existingIndex] = newScreenshot;
                    return updatedScreenshots;
                  } else {
                    // If angle hasn't changed, don't update
                    return prevScreenshots;
                  }
                } else {
                  // Add new screenshot
                  return [newScreenshot];
                }
              });
              ToastAndroid.show('Data tersimpan', ToastAndroid.SHORT);
      
          } catch (error) {
            console.error('Failed to capture screenshot', error);
            Alert.alert('Error', 'Failed to capture screenshot');
            ToastAndroid.show('error screenshot', ToastAndroid.SHORT);
          }
        } else {
          Alert.alert('Error', 'Tidak ada yang discreenshot! ambil foto terlebih dahulu');
          ToastAndroid.show('Tidak ada data tersedia', ToastAndroid.SHORT);
        }
      }, [permissionResponse, requestPermission, currentImage, angle]);


    const onGambarPress = async () => {
        // Request permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Sorry, we need media library permissions to make this work!');
          return;
        }
      
        try {
          // Launch the image library
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
          });
      
          if (!result.canceled) {
            // Image selected
            const selectedImage = result.assets[0].uri;
            const data = {
                id: Math.random(),
                image : selectedImage,
            }
            setData([])
            setGaleri(data)
            setGambar(true)
            setCurrentImage(data)
            setSs([])
          } else {
            // User canceled image picker
            console.log('Image picker was canceled');
          }
        } catch (error) {
          console.error('Error picking an image:', error);
          Alert.alert('Error', 'An error occurred while picking an image.');
        }
      };


    useEffect(() => {
        if (permissionResponse === null) {
          requestPermission();
        }
      }, [permissionResponse, requestPermission]);

      const captureScreenshot = useCallback(async () => {
        if (!permissionResponse) {
          Alert.alert('Permission Required', 'Please grant permission to take screenshots.');
          return;
        }
    
        if (permissionResponse.status !== 'granted') {
          const { status } = await requestPermission();
          if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need permission to take screenshots.');
            ToastAndroid.show('Akses ditolak', ToastAndroid.SHORT);
            return;
          }
        }
    
        if (viewShotRef.current) {
          try {
            const uri = await viewShotRef.current.capture();
            
            setSs(prevScreenshots => {
              const existingIndex = prevScreenshots.findIndex(
                screenshot => screenshot.id === selectedBackground.id
              );
    
              const newScreenshot = {
                image : uri,
                id: selectedBackground.id,
                second: selectedBackground.second,
                angle: angle
              };
    
              if (existingIndex !== -1) {
                // Check if angle has changed
                if (prevScreenshots[existingIndex].angle !== angle) {
                  // Update existing screenshot
                  const updatedScreenshots = [...prevScreenshots];
                  updatedScreenshots[existingIndex] = newScreenshot;
                  return updatedScreenshots;
                } else {
                  // If angle hasn't changed, don't update
                  return prevScreenshots;
                }
              } else {
                // Add new screenshot
                return [...prevScreenshots, newScreenshot];
              }
            });
            ToastAndroid.show('Data tersimpan', ToastAndroid.SHORT);
    
          } catch (error) {
            console.error('Failed to capture screenshot', error);
            Alert.alert('Error', 'Failed to capture screenshot');
            ToastAndroid.show('error screenshot', ToastAndroid.SHORT);
          }
        } else {
          Alert.alert('Error', 'Tidak ada yang discreenshot! ambil foto terlebih dahulu');
          ToastAndroid.show('Tidak ada data tersedia', ToastAndroid.SHORT);
        }
      }, [permissionResponse, requestPermission, selectedBackground, angle]);

    function showToast() {
        ToastAndroid.show('Data Tersimpan!', ToastAndroid.SHORT);
      }

    const dataSetHandler = () => {
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === selectedBackground.id) {
                    return { ...item, angle: angle };
                }
                return item;
            });
        });
        captureScreenshot()
    };
    
    const dataSetHandler2 = () => {
        if (!currentImage) {
          ToastAndroid.show('Tidak ada gambar yang dipilih', ToastAndroid.SHORT);
          return;
        }
    
        setGaleri(prevData => {
          if (Array.isArray(prevData)) {
            return prevData.map(item => 
              item.id === currentImage.id ? { ...item, angle: angle } : item
            );
          } else if (typeof prevData === 'object' && prevData !== null) {
            // Jika somehow galeri adalah objek tunggal
            return { ...prevData, angle: angle };
          } else {
            console.error('Unexpected galeri data type:', prevData);
            return prevData; // Kembalikan data yang ada jika tipe tidak dikenali
          }
        });
    
        captureScreenshotGaleri();
        ToastAndroid.show('Angle berhasil diperbarui', ToastAndroid.SHORT);
      };

      const selectImage = (imageUri) => {
        setCurrentImage(imageUri);
      };

    const onDelete = ()=> {
        setData([])
        setSs([])
        setSelectedBackground([])
        setIsVisbile(false)
    }

    const onClose = ()=> {
        setIsVisbile(!isVisible)
    }
    

    const backgroundSet = (image) => {
        setSelectedBackground(image)
    }

    const cornerHandler = ()=> {
        setCornerIsVisible(!cornerisVisible)
    } 

    const zoomIn = () => {
        setScaleFactor(scaleFactor + 0.1);
    };

    const zoomOut = () => {
        if (scaleFactor > 1) {
            setScaleFactor(prevScale => prevScale - 0.1);
        }
    };

    const handleCameraPress = () => {
        setCameraVisible(!cameraVisible);
    };


    return (
        <View style={{flex : 1}}>
            {
                cameraVisible ? (
                <CameraComponent
                    onClose={(photoUri) => {
                        setCapturedPhoto(photoUri);
                        setCameraVisible(false);
                    }}
                    onBack={handleCameraPress}
                    setData={setData}
                    setGambar={()=> setGambar(false)}
                    setSs={()=> setSs([])}
                />
            ) : 
                data.length > 0 ?
            (
                <View style={{flex : 1}}>
                    <Header zoomIn={zoomIn} zoomOut={zoomOut} corner={cornerHandler}/>
                    {
                        selectedBackground.image == undefined ? ( 
                    <View 
                        style={{
                            flex: 1,
                        }}
                    >
                    <View style={styles.container}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.imageContainer}>
                                    {data.map((data, index) => (
                                            <TouchableOpacity key={index} onPress={() => backgroundSet({image : data.image, second : data.second, id : data.id})}>
                                            <View style={[styles.imageWrapper, {borderColor : selectedBackground.image === data.image ? '#76abaf' : '#fff'}]}>
                                                <Image source={{ uri: data.image }} style={[styles.image]} />
                                            </View>
                                            </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>) : (
                    <View style={{flex : 1}}>
                    <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.8 }} style={{ 
                        flex: 1, 
                        transform: [{ scale: scaleFactor }], // Apply zoom effect only to this container
                    }}>
                        {/* Gambar latar belakang */}
                        <Image
                            style={{
                                flex: 1, // Set gambar agar mengisi seluruh area container
                                resizeMode: 'cover' // Atur agar gambar menutupi seluruh area tanpa distorsi
                            }}
                            source={{ uri: selectedBackground.image }} 
                        />
                                            {
                            cornerisVisible === true ? (
                                <AngleMeter style={{position : 'absolute'}}/>
                            ) :
                            null
                        }
                        <View style={{ height : responsive * 0.11, width : responsive * 0.17, backgroundColor : '#000', marginLeft : 8, padding : 8, justifyContent : 'center', alignItems : 'center', borderRadius : 8, marginTop : 16, position: 'absolute'}}>
                            <Text style={{fontSize : responsive * 0.04,color: '#fff', fontWeight : 'bold'}}>{selectedBackground.second}s</Text>
                        </View>
                    </ViewShot>


                    {/* Konten statis di atas gambar */}
                    <View 
                        style={{ 
                        position: 'absolute', // Letakkan konten di atas gambar
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                    }}
                    >
                        {/* Tambahkan konten statis di sini */}

                        <TouchableOpacity onPress={onClose} style={{ height : responsive * 0.13, width : responsive * 0.13, backgroundColor : '#DD5746', marginLeft : 8, padding : 8, justifyContent : 'center', alignItems : 'center', borderRadius : 8, marginTop : 16, borderRadius: 30, position : 'absolute', bottom : responsive * 0.32, right : responsive * 0.08}}>
                            <Ionicons name='trash-outline' size={responsive * 0.06} color='#fff' />
                            <ModalDelete onClose={onClose} isVisible={isVisible} onDelete={onDelete}/>
                        </TouchableOpacity>
                        <View style={styles.container}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.imageContainer}>
                                    {data.map((data, index) => (
                                            <TouchableOpacity key={index} onPress={() => backgroundSet({image : data.image, second : data.second, id : data.id})}>
                                            <View style={[styles.imageWrapper, {borderColor : selectedBackground.image === data.image ? '#76abaf' : '#fff'}]}>
                                                <Image source={{ uri: data.image }} style={[styles.image]} />
                                            </View>
                                            </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    
                    </View>
                            )}
                    
                    <BottomNav onCameraPress={handleCameraPress} onGaleriPress={cornerHandler} data={data} onSaveState={dataSetHandler} onGambarPress={onGambarPress}/>
                </View>
            ) : (
                    <View style={{flex : 1}}>
                    <Header zoomIn={zoomIn} zoomOut={zoomOut} corner={cornerHandler}/>
                    <ViewShot
                    options={{ format: "png", quality: 0.8 }}
                    ref={shotRef} 
                        style={{
                            flex: 1,
                            transform: [{ scale: scaleFactor }],
                        }}
                    >

                    {gambar ? (
                            <Image
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover'
                            }}
                            source={{ uri: galeri.image }}
                            />
                        ) : null}
                        {
                        cornerisVisible === true ? (
                            <AngleMeter style={{position : 'absolute'}}/>
                        ) :
                        null
                        }

                    </ViewShot>

                        <View style={[styles.imageContainer]}>
                            {data.map((data, index) => (
                                    <TouchableOpacity key={index} onPress={() => backgroundSet({image : data.image, second : data.second, id : data.id})}>
                                    <View style={[styles.imageWrapper, {borderColor : selectedBackground.image === data.image ? '#76abaf' : '#fff'}]}>
                                        <Image source={{ uri: data.image }} style={[styles.image]} />
                                    </View>
                                    </TouchableOpacity>
                            ))}
                        </View>
                    <BottomNav onCameraPress={handleCameraPress} onGaleriPress={cornerHandler} data={data} onSaveState={dataSetHandler2} onGambarPress={onGambarPress}/>
                </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({  
    container : {
        position : 'absolute',
        bottom : 10
    },
    background: {
        resizeMode: 'cover',
      },
      imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft : 5,
        zIndex : 10,

      },
      image: {
        width: responsive * 0.16,
        height: responsive * 0.16,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      imageWrapper: {
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 10,
      },
      selectedMarker: {
        position: 'absolute',
        top: 2,
        left: 2,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        zIndex: 1,
      },
})

export default MainScreen

const CameraComponent = ({ onClose, onBack, data, setData, setGambar, setSs }) => {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [timer, setTimer] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [dataTempo, setDataTempo] = useState([]);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCapture = async () => {
        if (cameraRef.current) {
            const currentElapsedTime = timeElapsed;

            if (!timer) {
                setTimer(
                    setInterval(() => {
                        setTimeElapsed(prevTime => prevTime + 1);
                    }, 1020)
                );
            }

            const { uri } = await cameraRef.current.takePictureAsync({ quality: 0.4, base64: true });
            const newCapture = {
                id: Math.random(),
                image: uri,
                second: currentElapsedTime,
                angle: null,
            };
            setDataTempo(prevData => [...prevData, newCapture]);

            setShowText(true);
            setTimeout(() => {
                setShowText(false);
            }, 800);
        }
    };

    const save = () => {
        if (dataTempo.length > 0) {
            setData(prevData => [...prevData, ...dataTempo]);
            setDataTempo([]);
            onBack();
            setGambar(setGambar)
            setSs(setSs)
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No access to camera</Text>
                <TouchableOpacity onPress={() => Alert.alert(
                    'Camera Permission Required',
                    'Please grant camera permission in your device settings to use this feature.',
                    [{ text: 'OK', onPress: () => onBack() }]
                )}>
                    <Text>Request Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <StatusBar backgroundColor='#202020' barStyle='light-content' />
                <View style={{ height: responsive * 0.16, backgroundColor: '#202020', justifyContent: 'space-between' }}>
                    <View style={{ position: 'absolute', top: 10, right: 10 }}>
                        <Text style={{ color: 'white' }}>{timeElapsed}s</Text>
                    </View>
                    {showText && <Text style={{ position: 'absolute', top: 10, color: 'white', fontSize: 12, marginLeft: 8 }}>OK</Text>}
                </View>
            </SafeAreaView>
            <Camera
                style={{ height: responsive * 1.65, width: responsive }}
                ref={cameraRef}
                type={Camera.Constants.Type.back}
                ratio='4:3'
                useCamera2Api
                focusable={true}
                focusDepth={0.9}
            />
            <View style={{ flex: 1, height: responsive * 0.3, width: '100%', position: 'absolute', bottom: 0, flexDirection: "row", backgroundColor: '#202020', padding: 16, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={onBack}>
                    <FontAwesome5 name='arrow-circle-left' size={responsive * 0.13} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCapture}>
                    <FontAwesome5 name={'circle'} size={responsive * 0.13} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={save}>
                    <Ionicons name={'checkmark-outline'} size={responsive * 0.13} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    );
};
