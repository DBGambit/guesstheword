import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

import ArmenianSvg from './languageSvg/ArmenianSvg';
import EnglishSvg from './languageSvg/EnglishSvg';
import RussianSvg from './languageSvg/RussianSvg';

const UpperSettings = ({rules, setLang, rulesToggler}) => {
    return (
            <View style={styles.UpperSettings} >
                <View style={styles.Languages} >
                    <TouchableOpacity onPress={() => setLang('arm')} style={styles.Language} >
                        <ArmenianSvg />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLang('eng')} style={styles.Language} >
                        <EnglishSvg />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLang('rus')} style={styles.Language} >
                        <RussianSvg />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={rulesToggler} style={styles.RulesButton} >
                    <Text includeFontPadding={false} textAlignVertical='center' style={styles.Rules} >{rules}</Text>
                </TouchableOpacity>
            </View>
        );
};

const styles = StyleSheet.create({
    UpperSettings: {
        marginTop: responsiveHeight(1.5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        alignSelf: 'center',
        // borderColor: 'green',
        // borderWidth: 1
    },
    Languages: {
        display: 'flex',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'red',
        width: '50%'
    },
    Language: {
        width: responsiveHeight(3.5),
        height: responsiveHeight(3.5),
        // borderWidth: 1,
        // borderColor: 'blue',
        marginRight: '12%',
        alignSelf: 'center'
    },
    RulesButton: {
        // borderColor: 'blue',
        // borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        height: responsiveHeight(5)
        // alignItems: 'center',
    },
    Rules: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: '#7a0c02',
        textAlign: 'center'
    },
})

export default UpperSettings;
