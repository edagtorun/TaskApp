import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native';
import React from 'react';
import colors from '../utils/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import  { useState } from 'react';
import TodoItem from '../components/TodoItem';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../constans/ScreenName';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText]= useState('');
  const [tasks, setTasks] = useState([
    {
      userId:1,
      id:1,
      title:"title",
      status:'closed',
    },
    {
      userId:2,
      id:2,
      title:"title",
      status:'open',
    }, {
      userId:3,
      id:3,
      title:"title",
      status:'closed',
    }, {
      userId:4,
      id:4,
      title:"title",
      status:'closed',
    }, {
      userId:5,
      id:5,
      title:"title",
      status:'closed',
    }, {
      userId:6,
      id:6,
      title:"title",
      status:'closed',
    }, {
      userId:7,
      id:7,
      title:"title",
      status:'closed',
    },
    {
      userId:8,
      id:8,
      title:"title",
      status:'open',
    }, {
      userId:9,
      id:9,
      title:"title",
      status:'open',
    }, 
  ])

  return (
    <View style={styles.container}>
     <View style={styles.mainContentContainer}>
      <SafeAreaView style={[styles.container, {marginBottom:20}]}>
        <CustomTextInput 
        placeholder='Task Ara' 
        value={searchText} 
        onChangeText={setSearchText} 
        imageSource={SearchIcon}
        style={{marginHorizontal: 0}}
        />
      <FlatList
       keyExtractor={item => item?.id.toString()} 
       data={tasks} 
       renderItem={({item}) => <TodoItem data={item}/>}
       showsVerticalScrollIndicator={false}
       />
      </SafeAreaView>
      <CustomButton onPress={()=>navigation.navigate(ScreenName.addTask)} label={"Add Task"}/>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.background.primary,
  },
  mainContentContainer:{
    height:'100%',
    position:'absolute',
    padding:20,
    width:Dimensions.get("screen").width,
  },
})