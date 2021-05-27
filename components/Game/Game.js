import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import { Audio } from 'expo-av';
// import { playClick } from '../../assets/sounds/sounds';
import clickSound from '../../assets/sounds/click.mp3'

import { AdMobBanner } from 'expo-ads-admob';

import WordsList from '../WordsList/WordsList';
import Score from '../Score/Score';
import Alert from '../Alert/Alert';

const Game = ({ui, teams, words, seconds, setTurn, target, setAlerted, lang}) => {
    const [start, setStart] = useState(false);
    const [showScore, setShowScore] = useState(false);
    // const [clickS, setClickS] = useState()

    const clickPlay = async () => {
        const {sound} = await Audio.Sound.createAsync(clickSound)
        await sound.playAsync()
    }


    return (
            <React.Fragment>
                {
                    start ? null :
                    <TouchableOpacity onPress={() => setShowScore(true)} style={styles.Button} >
                        <Text style={styles.Text} >{ui.score}</Text>
                    </TouchableOpacity>
                }
                <Score ui={ui} target={target} show={showScore} close={setShowScore} teams={teams} />
                <Alert target={target} lang={lang} teams={teams} setAlerted={setAlerted} ui={ui} />
                {
                    teams.map((team, i) => {
                        return (
                                team.turn ?
                                start ?
                                <WordsList endRound={setStart} teamIndex={i} setTurn={setTurn} words={words} team={team} key={team.id} seconds={seconds} /> :
                                <React.Fragment key={team.id}>
                                    <Text onPress={clickPlay} style={{marginTop: responsiveHeight(5), borderWidth: 1, alignSelf: 'center', fontSize: responsiveFontSize(3), fontWeight: 'bold', color: 'brown'}}>{team.name}</Text>
                                    <TouchableOpacity onPress={() => setStart(true)} style={[styles.Button, {borderColor: 'green'}]}>
                                        <Text style={styles.Text}>{ui.start}</Text>
                                    </TouchableOpacity>
                                </React.Fragment>
                                : null
                            )
                    })
                }
                <AdMobBanner style={styles.Ad1}
                    bannerSize = 'banner'
                    adUnitID = 'ca-app-pub-1577343719993277/7234139290'
                />
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
    },
    Ad1: {
        alignSelf: 'center',
        marginTop: responsiveHeight(50)
    }
})

export default Game;
