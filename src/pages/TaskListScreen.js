import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import colors from '../themes/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import  { useState } from 'react';
import TodoItem from '../components/TodoItem';
import CustomButton from '../components/CustomButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import renderEmptyList from '../components/EmptyList';
import Toast from 'react-native-toast-message';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

useFocusEffect(
  useCallback(() => {
    loadTasks();
  },[])
);
useEffect(() =>{
  filterTasks();
},[searchText, tasks]);

  const loadTasks = async () => {
    try {
     const existingTask =  await AsyncStorage.getItem('tasks');
     const tasks = existingTask ? JSON.parse(existingTask) : [];
     setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

 const filterTasks = () =>{
  if(searchText){
    const filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  setFilteredTasks(filtered);
  }else{
    setFilteredTasks(tasks);
  }
 };


const handleDeleteTask = async id => {
try {
  const updatedTasks = tasks.filter(task => task.id !== id);

  setTasks(updatedTasks);

await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

Toast.show({
  type:'error',
  text1:"Task silindi",
  topOffset:60,
}); 

} catch (error) {
  console.log(error, 'Failed to delete task');
}
};

const renderHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}> Tasks</Text>
  </View>
);
 

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
       ListHeaderComponent={renderHeader}
       ListEmptyComponent={renderEmptyList}
       data={filteredTasks} 
       renderItem={({item}) => 
       <TodoItem data={item} onDelete={() => handleDeleteTask(item.id) }/>}
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
  headerContainer:{
    marginBottom:10,
  },
  headerText:{
    fontSize:25,
    fontWeight:'bold',
    color:colors.text.primary,
  },
  
});