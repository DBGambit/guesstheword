import React, { Component } from'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

import Timer from '../Timer/Timer';

class WordsList extends Component {
    state = {
        allGuessed: [],
        wordsSet: []
    }

    componentDidMount() {
        this.getWordsSet()
        // console.log(this.props.seconds)
    }

    componentDidUpdate(prevProps, prevState) {
        let guessed = 0
        this.state.wordsSet.forEach(word => {
            if (word.guessed) {
                guessed++
            }
        })
        if (guessed === 5) {
            this.getWordsSet()
        }
        // console.log('Words Set', this.state.wordsSet, 'All Guessed', this.state.allGuessed)
    }

    getWordsSet = () => {
        const words = [...this.props.words].filter(word => (!this.props.team.guessedWords.includes(word)) && !this.state.allGuessed.includes(word))
        // console.log('filtered words', words, 'team prop guessed', this.props.team.guessedWords)
        let wordsSet = []
        for (let i=0; i<5; i++ ) {
            const randomNumber = Math.round(Math.random() * (words.length - 1))
            wordsSet.push({name: words[randomNumber], guessed: false}) // ??
            words.splice(randomNumber, 1)
        }
        this.setState({
            wordsSet: wordsSet
        })
    }

    setGuessed = (wordIndex) => {
        let updWordsSet = [...this.state.wordsSet]
        updWordsSet[wordIndex].guessed = !updWordsSet[wordIndex].guessed
        let updAllGuessed = [...this.state.allGuessed]
        if (updWordsSet[wordIndex].guessed) {
            updAllGuessed.push(updWordsSet[wordIndex].name)
        }else {
            updAllGuessed = updAllGuessed.filter(word => word !== updWordsSet[wordIndex].name)
        }
        this.setState({
            allGuessed: updAllGuessed,
            wordsSet: updWordsSet
        })
    }

    render() {
        const { wordsSet, allGuessed } = this.state
        const { team, seconds, setTurn, teamIndex, endRound } = this.props
        return (
                <React.Fragment>
                    <Text style={styles.TeamName} >{team.name}</Text>
                    <View style={styles.Words} >
                        {
                            wordsSet.map((word, index) => {
                                return (
                                        <TouchableOpacity key={word.name} onPress={() => this.setGuessed(index)} style={word.guessed ? styles.WordGuessed : styles.Word} >
                                            <Text style={word.guessed ? [styles.WordText, {color: 'green', fontWeight: 'bold'}] : styles.WordText} >{word.name}</Text>
                                        </TouchableOpacity>
                                    )
                            })
                        }
                    </View>
                    <Timer endRound={endRound} setTurn={setTurn} teamIndex={teamIndex} guessed={allGuessed} time={seconds} />
                </React.Fragment>
            );
    };
};

const styles = StyleSheet.create({
    TeamName: {
        marginTop: responsiveHeight(3.5),
        backgroundColor: '#f0ebeb',
        elevation: 12,
        width: responsiveWidth(90),
        // height: responsiveHeight(7),
        alignSelf: 'center',
        textAlign: 'center',
        // borderWidth: 3,
        borderRadius: 10,
        // borderColor: 'green',
        color: 'green',
        fontSize: responsiveFontSize(3.5)
    },
    Words: {
        marginTop: responsiveHeight(10),
        display: 'flex',
        justifyContent: 'space-between',
        // borderWidth: 1,
        width: responsiveWidth(90),
        alignSelf: 'center',
        height: responsiveHeight(50)
    },
    Word: {
        backgroundColor: '#f0ebeb',
        elevation: 7,
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        height: responsiveHeight(7),
        alignSelf: 'center',
        borderWidth: 3,
        // borderRadius: 10,
        borderColor: 'brown'

    },
    WordGuessed: {
        backgroundColor: '#d5f7d9',
        elevation: 12,
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        height: responsiveHeight(7),
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'green'
    },
    WordText: {
        // borderWidth: 1,
        // alignSelf: 'center',
        textAlign: 'center',
        fontSize: responsiveFontSize(3),
        color: 'brown'
    }
})

export default WordsList;
