import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import Modal from 'react-native-modal';

import Score from '../Score/Score';

const GameOver = ({teams, winner, target, lang, ui, startOver}) => {
    const [show, setShow] = useState(true)
    const [showScore, setShowScore] = useState(false)
    return (
            <React.Fragment>
                <Modal
                    isVisible={show}
                    animationIn='slideInDown'
                    animationInTiming={300}
                    animationOut='slideOutUp'
                    animationOutTiming={300}
                    backdropOpacity={0.3}
                    onBackdropPress={() => setShow(false)}
                >
                    <View style={{
                            borderWidth: 3,
                            borderRadius: 15,
                            borderColor: 'green',
                            backgroundColor: '#f0ebeb',
                            elevation: 12,
                            width: '80%',
                            height: responsiveHeight(20),
                            alignSelf: 'center',
                            marginBottom: responsiveHeight(25)
                        }} >
                        <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5), color: 'brown', fontWeight: 'bold', marginTop: '3%'}}
                        >Congrats {winner} they win</Text>
                    </View>
                </Modal>
                <Score ui={ui} target={target} show={showScore} close={setShowScore} teams={teams} />
                <TouchableOpacity onPress={() => setShowScore(true)} style={styles.Button} >
                    <Text style={styles.Text} >{ui.score}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startOver(true)} style={[styles.Button, {borderColor: 'green', marginTop: responsiveHeight(25)}]} >
                    <Text style={styles.Text} >{ui.again}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startOver(false)} style={[styles.Button, {borderColor: 'green'}]} >
                    <Text style={styles.Text} >{ui.menu}</Text>
                </TouchableOpacity>
            </React.Fragment>
        );
};

const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#f0ebeb',
        elevation: 12,
        marginTop: responsiveHeight(5),
        width: responsiveWidth(70),
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'brown'
    },
    Text: {
        // borderWidth: 1,
        // borderColor: 'blue',
        fontSize: responsiveFontSize(4.5),
        // fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default GameOver;
