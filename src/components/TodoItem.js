import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../utils/Colors';
import StatusButton from './StatusButton';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from '../pages/SplashScreen';
import ScreenName from '../constans/ScreenName';
import Icon from 'react-native-vector-icons/AntDesign';

export default function TodoItem({data}) {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <View style={styles.itemHeader}>
        <Text style={[styles.taskTitle,
        {
             textDecorationLine: data?.status === 'closed' ? 'line-through' : null
        },
        ]}>{data?.title?.toUpperCase()}
        </Text>
        <View style={{flexDirection:'row'}}>
            <View style={[styles.statusContainer, {
                backgroundColor:data?.status === ('open' || 'progress') ? '#CAF6cb' : '#FECcb1',
            }]}>
            <Text style={{
                color: data?.status === ('open' || 'progress') ? "#72966f" : "#d6825c"
            }}>{data?.status}</Text>
            </View>
            <StatusButton iconName='pencil' onPress={() =>navigation.navigate(ScreenName.addTask) }/>
            <StatusButton iconName='delete' color={'#c0695e'} />
        </View>
     </View>

     <Text style={styles.taskDescription}>{data?.description}</Text>
     <View style={styles.footerContainer}>
        <View>
            <Text>Baslangic Tarihi</Text>
            <View style={styles.timeContainer}>
                 <Icon name="clockcircleo" color={colors.primary} size={25}/>
                 <Text style={styles.timeText}>15.10.2024 - 19.00</Text>
            </View>
        </View>
        <View>
            <Text>Bitis Tarihi</Text>
            <View style={styles.timeContainer}>
                 <Icon name="clockcircleo" color={colors.primary} size={25}/>
                 <Text style={styles.timeText}>25.10.2024 - 12.00</Text>
            </View>
        </View>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        padding:15,
        borderRadius:15,
        marginBottom:15,
    },
    itemHeader:{
        flexDirection:'row',
        justifyContent:"space-between",
    },
    taskTitle:{
        flex:1,
        fontSize:15,
        color:colors.text.primary,
        fontWeight:'600',
        marginBottom:5,
    },
    statusContainer:{
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
    },
    taskDescription:{},
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    timeText:{
        color:colors.primary,
        fontWeight:"600",
        marginHorizontal:5,
        fontSize:12,
    },
    timeContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end',
    },

});