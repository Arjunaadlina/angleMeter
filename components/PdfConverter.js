import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text, View} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing'
import { useAngle } from '../store/angleCtx'
import CustomModal from './ModalA';
import { Ionicons } from '@expo/vector-icons';

const responsive = Dimensions.get('window').width
const PDFConverter = () => {
    const {ss} = useAngle();
    const [isVisible, setIsVisible] = useState(false)

    const generatePDF = async () => {
        let htmlContent = `
          <html>
          <head>
          <style>
            table {
              border-collapse: collapse;
              width: 90%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
            <body>
              <table border="1">
                <tr>
                  <th>No</th>
                  <th>Detik</th>
                  <th>Sudut</th>
                  <th>Gambar</th>
                </tr>
        `;
        for (let i = 0; i < ss.length; i++) {
            const base64Image = await getBase64Image(ss[i].image);
            htmlContent += `
              <tr>
                <td>${i + 1}</td>
                <td>${ss[i].second} Detik</td>
                <td>${ss[i].angle} °</td>
                <td><img src="data:image/jpeg;base64,${base64Image}" alt="Gambar" style="width: 250px; height: 357px;"></td>
              </tr>
            `;
          }
        htmlContent += `
              </table>
            </body>
          </html>
        `;
    
        const { uri } = await Print.printToFileAsync({ html: htmlContent, height : 900 });
        
        save(uri)
      };
    
      const getBase64Image = async (imageUri) => {
        const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        return base64;
      };

     
    const save = (uri) => {
        shareAsync(uri)
    }

    const onClose = ()=> {
        setIsVisible(!isVisible)
    }

    return (
        <View>
            <TouchableOpacity style={styles.containerIcon} onPress={onClose}>
                <Ionicons name='document-outline' color='#fefefe' size={responsive * 0.06}/>
            </TouchableOpacity>
            <Text style={{color : '#fff', marginTop : 10, textAlign : 'center'}}>Pdf</Text>
            <CustomModal isVisible={isVisible} onClose={onClose} data={ss} onCetak={generatePDF}/>
        </View>
    );
};


const styles = StyleSheet.create({
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

export default PDFConverter;