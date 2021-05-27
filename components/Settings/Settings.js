import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AnimatedButton from '../AnimatedButton/AnimatedButton';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = ({seconds, target, set, uiTime}) => {
    return (
            <View style={styles.Settings} >
                <View style={styles.Setting} >
                    <AnimatedButton action={set} actionType='minustarget' type='minus' size={responsiveHeight(4.5)} active={target > 10} />
                    <View style={{display: 'flex', flexDirection: 'row', width: '37%'}} >
                        <View style={{borderWidth:1, borderColor: 'orange',width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                            <MaterialCommunityIcons name='target' style={{alignSelf: 'center'}} size={responsiveHeight(4.5)} color='brown' />
                            <Text style={{lineHeight: responsiveHeight(5.3),fontSize: responsiveHeight(5),fontWeight: 'bold', color: 'brown'}} >{target}</Text>
                        </View>
                    </View>
                    <AnimatedButton action={set} actionType='plustarget' type='plus' size={responsiveHeight(4.5)} active={target < 300} />
                </View>
                <View style={styles.Setting} >
                    <AnimatedButton action={set} actionType='minusseconds' type='minus' size={responsiveHeight(4.5)} active={seconds > 10} />
                    <View style={{display: 'flex', flexDirection: 'row', width: '37%'}} >
                        <View style={{borderWidth:1, borderColor: 'orange', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                            <AntDesign name='clockcircleo' style={{alignSelf: 'center'}} size={responsiveHeight(4.5)} color='green' />
                            <Text style={{lineHeight: responsiveHeight(5.3),fontSize: responsiveHeight(5),fontWeight: 'bold', color: 'green'}} >{seconds}</Text>
                        </View>
                        <Text style={{lineHeight: responsiveHeight(5.3),fontSize: responsiveHeight(3),fontWeight: 'bold', color: 'green', borderWidth: 1, borderColor: 'red'}} >{uiTime}</Text>
                    </View>
                    <AnimatedButton action={set} actionType='plusseconds' type='plus' size={responsiveHeight(4.5)} active={seconds < 300} />
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    Settings: {
        display: 'flex',
        justifyContent: 'space-between',
        height: responsiveHeight(14),
        width: responsiveWidth(80),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'blue',
        marginTop: responsiveHeight(3)
    },
    Setting: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: responsiveHeight(5),
        borderWidth: 1,
        borderColor: 'green',
    }
});

export default Settings;
