import React from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import Modal from 'react-native-modal';
import { AntDesign, FontAwesome5, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Score = ({show, close, teams, ui, target}) => (
        <Modal
            useNativeDriver={true}
            isVisible={show}
            animationIn='slideInDown'
            animationInTiming={300}
            animationOut='slideOutUp'
            animationOutTiming={300}
            backdropOpacity={0.3}
            onBackdropPress={() => close(false)}
            >
            <View style={[styles.Scores, {height: responsiveHeight(14.5) + (teams.length * responsiveHeight(5)), marginBottom: responsiveHeight(37) - (teams.length * responsiveHeight(5))}]} >
                <View style={{ height: responsiveHeight(3.5), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1.5)}} >
                    <Text style={{ width: '33%', textAlign: 'center', marginLeft: '13%', backgroundColor: 'white', color: 'brown', elevation: 5, borderRadius: 3, fontSize: responsiveFontSize(2)}} >{ui.team}</Text>
                    <Text style={{ width: '33%', textAlign: 'center', marginRight: '5%', backgroundColor: 'white', color: 'green', elevation: 5, borderRadius: 3, fontSize: responsiveFontSize(2)}} >{ui.scores}</Text>
                </View>
                <View style={{ borderColor: 'red', marginTop: responsiveHeight(2.5)}} >
                        {
                            teams.map(team => {
                                return (
                                        <View key={team.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(3.5), marginBottom: responsiveHeight(1.5)}} >
                                            <Text style={{ width: '60%', textAlign: 'center', color: 'brown', fontSize: responsiveFontSize(1.9)}} >{team.name}</Text>
                                            <Text style={{ width: '40%', textAlign: 'center', color: 'green', fontSize: responsiveFontSize(1.9)}} >{team.guessedWords.length}</Text>
                                        </View>
                                    )
                            })
                        }
                </View>
                <View style={{display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'flex-end'}} >
                <View style={{alignSelf: 'center', display: 'flex', flexDirection: 'row', width: '37%', justifyContent: 'space-evenly'}} >
                    <MaterialCommunityIcons name='target' style={{fontSize: responsiveFontSize(3), color: 'green', alignSelf: 'center', left: 1}} />
                    <Text style={{fontSize: responsiveFontSize(3), color: 'green'}}>{target}</Text>
                </View>
                </View>
            </View>
        </Modal>
    );

const styles = StyleSheet.create({
    ScoreText: {
        textAlign: 'center',
        color: 'brown',
        fontSize: responsiveHeight(2.3),
    },
    ScoreInner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        marginTop: '5%',
        width: '90%',
        height: '80%',
        alignSelf: 'center'
    },
    Scores: {
        width: responsiveWidth(80),
        // height: responsiveHeight(30),
        // marginBottom: responsiveHeight(20),
        backgroundColor: '#f0ebeb',
        borderWidth: 3,
        borderColor: 'green',
        borderRadius: 10,
        elevation: 12,
        alignSelf: 'center',
    }
});

export default Score;
