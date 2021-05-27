import React, { useRef } from 'react';
import { Animated, View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import { AntDesign } from '@expo/vector-icons';

const Teams = ({teams, changingToggle, changeName, deleteTeam, add, play}) => {
    const initialSize = useRef(new Animated.Value(1)).current

    const bounce = () => {
        Animated.timing(initialSize, {
                toValue : 1.3,
                duration: 150,
                useNativeDriver: true
            }).start(() => {
                Animated.timing(initialSize, {
                toValue : 1,
                duration: 150,
                useNativeDriver: true
            }).start()
            })
    }

    const animation = {
            transform : [
                {scale: initialSize}
            ]
    }

    return (
            <React.Fragment>
            <View style={styles.Teams} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={teams}
                    renderItem={({item, index}) => {
                        return (
                                    <View style={styles.Team} >
                                        {
                                            item.changingName ?
                                            <TextInput
                                                onSubmitEditing={()=> changingToggle(index) }
                                                onChangeText={(value) => changeName(value, index)}
                                                autoFocus={true}
                                                autoCorrect={false}
                                                autoCapitalize='words'
                                                autoCompleteType='off'
                                                maxLength={13}
                                                value={item.name}
                                                style={{
                                                    width:'85%',
                                                    borderWidth: 1.5,
                                                    borderColor: 'green',
                                                    fontWeight: 'bold',
                                                    fontSize: responsiveFontSize(2),
                                                    color: 'brown',
                                                    textAlign: 'center',
                                                    borderRadius: 10
                                                }} />
                                            :
                                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => changingToggle(index)} >
                                                <Animated.Text style={[styles.TeamName, index === (teams.length - 1) && index > 1 ? animation : null]} >{item.name}</Animated.Text>
                                            </TouchableOpacity>
                                        }
                                        {
                                            item.changingName ?
                                            <TouchableOpacity onPress={() => changingToggle(index)} style={{alignSelf: 'center'}} >
                                                <AntDesign name='check' style={{fontSize: responsiveFontSize(3.9), alignSelf: 'center', color: 'green', textAlign: 'center'}} />
                                            </TouchableOpacity> :
                                            teams.length > 2 ?
                                                <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => deleteTeam(index)} >
                                                    <AntDesign name='closecircleo' style={{fontSize: responsiveFontSize(3.9), alignSelf: 'center', color: 'brown', textAlign: 'center'}} />
                                                </TouchableOpacity>
                                            : null
                                        }
                                    </View>
                            )
                    }}
                    keyExtractor={item => String(item.id)}
                />
            </View>
            <View style={styles.BottomButtons} >
                <TouchableOpacity activeOpacity={teams.length < 8 ? 0.2 : 1} onPressIn={add} onPressOut={bounce} >
                    <AntDesign name='pluscircleo' size={responsiveFontSize(5)} color={teams.length < 8 ? 'green' : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={play} >
                    <AntDesign name='playcircleo' size={responsiveFontSize(5)} color='brown' />
                </TouchableOpacity>
            </View>
            </React.Fragment>
        );
};

const styles = StyleSheet.create({
    Teams: {
        backgroundColor: '#f0ebeb',
        elevation: 15,
        marginTop: responsiveHeight(5),
        borderWidth: 2,
        borderRadius: 15,
        borderBottomWidth: 7,
        borderColor: 'brown',
        width: responsiveWidth(80),
        height: responsiveHeight(35),
        alignSelf: 'center'
    },
    Team: {
        borderWidth: 1,
        width: '80%',
        height: responsiveHeight(5),
        alignSelf: 'center',
        marginTop: '3.5%',
        marginBottom: '3.5%',
        // marginBottom: responsiveHeight(3),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TeamName: {
        borderWidth: 1,
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'brown',
        textAlign: 'center'
    },
    BottomButtons: {
        marginTop: responsiveHeight(5),
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%',
        alignSelf: 'center'
    }
});

export default Teams;
