import { Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splash = () => {
  return (
    <SafeAreaView style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
    <StatusBar backgroundColor='#fff' style='light'/>
      <Image source={require('../assets/splashh.png')} style={{height : '100%', width : '100%',resizeMode:'contain'}}/>
    </SafeAreaView>
  )
}

export default Splash