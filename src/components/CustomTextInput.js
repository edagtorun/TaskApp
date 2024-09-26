import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

import colors from '../utils/Colors';


export default function CustomTextInput({imageSource, onChangeText, value, ...rest}) {

   

  return (
    <TouchableOpacity style={styles.container}>
        {/* <Text>Task</Text> */}
        <View style={styles.inputConatiner}>
            <Image source={imageSource} style={styles.image}/>
            <TextInput
             value={value} 
             onChangeText={onChangeText} 
             style={styles.TextInput}
           {...rest}
             />
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginBottom:15
    },
    image:{
        width:20,
        height:20,
        marginRight:10,
    },
    TextInput:{
        flex:1,
        fontSize:16,
        padding:0,
    },
    inputConatiner:{
        flexDirection:"row",
        alignItems:'center',
        backgroundColor:colors.white,
        padding:15,
        borderRadius:15,
    },
})