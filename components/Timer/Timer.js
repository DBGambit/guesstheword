import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

const Timer = ({time, setTurn, teamIndex, guessed, endRound}) => {
    const [seconds, setSeconds] = useState(time)
    useEffect(() => {
        let interval= null
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        }else if (seconds <= 0) {
            endRound(false)
            setTurn(teamIndex, guessed)
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [seconds])

    let tw = 100
    let tc = '#096105'
    if (time) {
        tw = (seconds / time) * 100
        tc = tw > 50 ? tc : tw > 15 ? '#b84b14' : 'brown'
    }


    return (
            <React.Fragment >
                <View style={{marginTop: responsiveHeight(3)}}>
                    <Text style={styles.Timer} >{seconds}</Text>
                    <View style={styles.TimerBar} >
                        <View
                            style={{
                                    height: '100%',
                                    width: `${tw}%`,
                                    borderRadius: -15,
                                    backgroundColor: tc
                                }}

                        ></View>
                    </View>
                </View>
            </React.Fragment>
        );
};

const styles = StyleSheet.create({
    Text: {
        fontSize: responsiveHeight(3.9),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    Timer: {
        fontSize: responsiveFontSize(5),
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: responsiveHeight(5),
        color: '#7a0c02'
    },
    TimerBar: {
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: responsiveHeight(10),
        overflow: 'hidden',
        backgroundColor: '#babfba',
        elevation: 7
    }
})

export default Timer;
