import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constans/AsyncStorageKey';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../constans/ScreenName';

export default function SplashScreen() {
  const navigation = useNavigation();

async function checkOnboardingComplete() {
 const onboardingComplete = await AsyncStorage.getItem(AsyncStorageKey.onboardingComplete);

 if(onboardingComplete === "true"){
  navigation.replace(ScreenName.taskList);
 }else{
  navigation.replace(ScreenName.onboarding);
 }
}


  return (
    <View style={styles.container}>
      <LottieView  
      autoPlay 
      loop={false}
      source={require("../assets/animations/to-do.json")}
       style={{flex:1}} 
       onAnimationFinish={()=> {
        setTimeout(()=> {
          checkOnboardingComplete()
        }, 300)
       }}/>
    </View>
  );
};
const styles = StyleSheet.create({
container:{
  flex:1,
}
});