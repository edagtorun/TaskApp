import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

import colors from '../utils/Colors';


export default function CustomTextInput({
    imageSource,
    label,
     onChangeText, 
     value,
     style, 
     onPressIcon,
     ...rest}) {

   

  return (
    <TouchableOpacity 
    disabled={onPressIcon ? false : true}
    onPress={()=> onPressIcon()} 
    style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputConatiner}>
            <Image source={imageSource} style={styles.image}/>
            {!onPressIcon ? (
                <TextInput
                value={value} 
                onChangeText={onChangeText} 
                style={styles.TextInput}
              {...rest}
                />
            ) : (
                <Text>{value}</Text>
            ) }
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
    label:{
        fontSize:15,
        color:colors.text.primary,
        fontWeight:'600',
        marginBottom:5,
    },
})