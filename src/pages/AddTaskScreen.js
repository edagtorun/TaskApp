import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png'
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../utils/Colors';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../constans/ScreenName';
import uuid from 'react-native-uuid';



export default function AddTaskScreen() {

  const navigation = useNavigation();

const [title, setTitle] = useState("");

const {data} = {};

const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [startDate, setStartDate]= useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

const [isStartDatePickerVisible, setStartDatePickerVisible]= useState(false);

const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showStartDatePicker = () => { setStartDatePickerVisible(true)};
const hideStartDatePicker = () =>{ setStartDatePickerVisible(false)};

const showEndDatePicker = () => { setEndDatePickerVisible(true)};
const hideEndDatePicker = () => { setEndDatePickerVisible(false)};



const handleConfirmStartDate = (date) => {
  setStartDate(date.toString());
  hideStartDatePicker();
};

const handleConfirmEndDate = (date) => {
  setEndDate(date.toString());
  hideEndDatePicker();
};

const handleAddTask = async ()=> {
  const newTask = {
    id: uuid.v4(),
    title,
    startDate,
    endDate,
    status:value,
  };

  try {
    const existingTasks = await AsyncStorage.getItem('tasks');
    let tasks = existingTasks ? JSON.parse(existingTasks) : [];

    if(data){
      tasks.map(task => (task.id === data.id ? newTask : task));
    }else{
      tasks.push(newTask);
    }
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
navigation.navigate(ScreenName.taskList)
  
  } catch (error) {
  console.log(error, "Failed to save task")
  }
};

return (
    <View style={styles.container}>
    <View style={styles.inlineContainer}>
      <View style={styles.taskImageContainer}>
        <LottieView autoPlay loop style={{height:100, width:'100%'}} source={require('../assets/animations/pencil.json')}/>
      </View> 
      <CustomTextInput imageSource={TaskNameIcon} label={"Task Adi"} onChangeText={setTitle} value={title}/>
      <View style={{flexDirection:"row"}}>
        <CustomTextInput 
        onPressIcon={() => showStartDatePicker()}
         imageSource={TaskNameIcon}
          style={{width:"40%"}}
           label={'Baslangic Zamani'}
           onChangeText={setStartDate}
           isDate
           value={startDate}
           />
        <CustomTextInput
        onPressIcon={() => showEndDatePicker()}
         imageSource={TaskNameIcon} 
          style={{width:"40%"}} 
           label={'Bitis Zamani'}
           isDate
           value={endDate}
           onChangeText={setEndDate}
           />
      </View>
      <View style={styles.dropdownPicker}>
        <View>
          <Text style={styles.status}>Status</Text>
          <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      containerStyle={{width:"90%"}}
      style={{borderWidth:0,}}
    />
        </View>
      </View>
    </View>


    <CustomButton onPress={handleAddTask} label={data ? "Update Task" : "Save Task"} style={{width:'90%'}}/>

  <DateTimePicker
   onCancel={hideStartDatePicker}
    isVisible={isStartDatePickerVisible} 
    mode='datetime' 
    onConfirm={handleConfirmStartDate}/>
  <DateTimePicker 
  onCancel={hideEndDatePicker} 
  isVisible={isEndDatePickerVisible} 
  mode='datetime' 
  onConfirm={handleConfirmEndDate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.background.primary,
    alignItems:'center',
  },
  inlineContainer:{
    width:'100%',
  },
  taskImageContainer:{
    marginTop:60,
  },
  dropdownPicker:{
    justifyContent:'center',
    width:'100%',
    alignItems:'center',
    marginBottom:150,
  },
  status:{
    fontSize:15,
    marginBottom:5,
    fontWeight:'600',
    color:colors.text.primary
  },
})