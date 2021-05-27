import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { deepCopy, langTeams } from './tools';
import { Armenian, Russian, English } from './languages';

import { LinearGradient } from 'expo-linear-gradient';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';

import UpperSettings from './components/UpperSettings/UpperSettings';
import Settings from './components/Settings/Settings';
import Teams from './components/Teams/Teams';
import Game from './components/Game/Game';
import AnimatedButton from './components/AnimatedButton/AnimatedButton';
import GameOver from './components/GameOver/GameOver';

export default class App extends Component {
    state = {
            language: deepCopy(Armenian),
            teams: [
                {
                    name: 'Թիմ 1',
                    guessedWords: [],
                    changingName: false,
                    id: 1,
                    turn: false,
                    alert: false,
                    alerted: false
                },
                {
                    name: 'Թիմ 2',
                    guessedWords: [],
                    changingName: false,
                    id: 2,
                    turn: false,
                    alert: false,
                    alerted: false
                }
            ],
            uniqueId: 2,
            playing: false,
            seconds: 10,
            target: 30,
            gameOver: false,
            winnerTeam: null,
            showRules: false
        }

    componentDidUpdate() {
        // console.log(this.state.gameOver, 'winner', this.state.winnerTeam, 'teams', this.state.teams)
    }

    setGuessedWords = (teamIndex, words) => {
        let updTeams = deepCopy(this.state.teams)
        updTeams[teamIndex].guessedWords = updTeams[teamIndex].guessedWords.concat(words)
        this.setState({
            teams: updTeams
        })
    }

    startOver = (mode) => {
        let updTeams = deepCopy(this.state.teams)
        updTeams.forEach(team => {
            team.guessedWords = []
            team.turn = false
            team.alert = false
            team.alerted = false
        })
        if (mode) {
            updTeams[0].turn = true
        }
        this.setState({
            teams: updTeams,
            playing: mode ? true : false,
            gameOver: false,
            winnerTeam: null

        })
    }

    changeLanguage = (lang) => {
        if (this.state.language.lang !== lang) {
            switch(lang) {
                case 'arm':
                    this.setState({language: Armenian, teams: langTeams(lang), uniqueId: 2})
                    break;
                case 'rus':
                    this.setState({language: Russian, teams: langTeams(lang), uniqueId: 2})
                    break;
                case 'eng':
                    this.setState({language: English, teams: langTeams(lang), uniqueId: 2})
                    break;
                default: return
            }
        }
        return
    }

    showRulesToggler = () => {
        this.setState(prevState => {
            return {
                showRules: !prevState.showRules
            }
        })
    }

    addTeam = () => {
        if (this.state.teams.length < 8) {
            const newTeams = deepCopy(this.state.teams)
            const newTeam = {
                // name: `Team${this.state.uniqueId+1}`,
                name: this.state.language.ui.newTeam,
                guessedWords: [],
                changingName: false,
                id: this.state.uniqueId + 1,
                turn: false,
                alert: false,
                alerted: false
            }
            newTeams.push(newTeam)
            // this.setState({
            //     teams: newTeams,
            //     uniqueId: this.state.uniqueId + 1
            // })
            this.setState((prevState) => {
                return {
                    teams: newTeams,
                    uniqueId: prevState.uniqueId + 1
                }
            })
        }
        return
    }

    deleteTeam = (teamIndex) => {
        const newTeams = deepCopy(this.state.teams)
        newTeams.splice(teamIndex, 1)
        this.setState({teams: newTeams})
    }

    changingToggle = (i) => {
        const newTeams = deepCopy(this.state.teams)
        newTeams[i].changingName = !this.state.teams[i].changingName
        if (newTeams[i].name.trim().length === 0) {
            newTeams[i].name = this.state.language.ui.noname
        }
        this.setState({teams: newTeams})
    }

    changeName = (event, i) => {
        const newTeams = deepCopy(this.state.teams)
        newTeams[i].name = event
        this.setState({teams: newTeams})
    }

    setSettingHandler = (type) => {
        switch (type) {
            case 'plusseconds':
                if (this.state.seconds < 300) {
                }
                this.setState((prevState) => {
                    return {seconds: prevState.seconds === 300 ? 300: prevState.seconds + 5}
                })
                break;
            case 'minusseconds':
                if (this.state.seconds > 10) {
                }
                this.setState((prevState) => {
                    return {seconds: prevState.seconds === 10 ? 10: prevState.seconds - 5}
                })
                break;
            case 'plustarget':
                if (this.state.target < 300) {
                }
                this.setState((prevState) => {
                    return {target: prevState.target === 300 ? 300 : prevState.target + 5}
                })
                break;
            case 'minustarget':
                if (this.state.target > 5) {
                }
                this.setState((prevState) => {
                    return {target: prevState.target === 10 ? 10 : prevState.target - 5}
                })
                break;
            default:
                return
        }
    }

    setPlayingHandler = () => {
        const newTeams = deepCopy(this.state.teams)
        newTeams[0].turn = true
        this.setState({
            playing: true,
            teams: newTeams
        })

    }

    setAlerted = (teamIndex) => {
        const updTeams = deepCopy(this.state.teams)
        updTeams[teamIndex].alerted = true
        // console.log('set alerted', updTeams)
        this.setState({
            teams: updTeams
        })
    }

    setTurnHandler = (teamIndex, guessed) => {
        const updTeams = deepCopy(this.state.teams)
        updTeams[teamIndex].guessedWords = updTeams[teamIndex].guessedWords.concat(guessed)
        updTeams[teamIndex].turn = false
        if (teamIndex < (updTeams.length - 1)) {
            updTeams[teamIndex + 1].turn = true
        } else {
            updTeams[0].turn = true
        }

        if (updTeams[teamIndex].guessedWords.length >= this.state.target) {
            updTeams[teamIndex].alert = true
        }
        if ( updTeams.some(team => team.guessedWords.length >= this.state.target) && (teamIndex === (updTeams.length-1)) ) {
            let allScores = []
            let highestEquals = []
            // let winner = null
            updTeams.forEach(team => {
                allScores.push(team.guessedWords.length)
            })
            let highest = Math.max(...allScores)
            updTeams.forEach((team, i) => {
                if (team.guessedWords.length === highest) {
                    highestEquals.push(i)
                }
            })
            this.setState({
                teams: updTeams,
                gameOver: highestEquals.length > 1 ? false : true,
                winnerTeam: highestEquals.length > 1 ? null : updTeams[highestEquals[0]].name
            })
        } else {
            this.setState({
                teams: updTeams
            })
        }
    }

    render() {
        const { seconds, target, teams, playing, language, gameOver, winnerTeam, uniqueId } = this.state
        return (
            <View style={styles.Menu}>
                <LinearGradient
                    colors={['white', 'orange']}
                    style={styles.Background}
                />
                <StatusBar hidden style="auto" />
                {
                    gameOver ?
                    <GameOver startOver={this.startOver} teams={teams} winner={winnerTeam} target={target} lang={language.lang} ui={language.ui} /> :
                    playing ?
                    <Game lang={language.lang} setTurn={this.setTurnHandler} setAlerted={this.setAlerted} seconds={seconds} target={target} ui={language.ui} teams={teams} words={language.words} /> :
                    <React.Fragment>
                        <Text style={styles.Logo} >{language.ui.logo}</Text>
                        <UpperSettings rules={language.ui.rules} setLang={this.changeLanguage} rulesToggler={this.showRulesToggler} />
                        <Settings seconds={seconds} target={target} set={this.setSettingHandler} uiTime={language.ui.time} />
                        <Teams play={this.setPlayingHandler} add={this.addTeam} id={uniqueId} teams={teams} changingToggle={this.changingToggle} changeName={this.changeName} deleteTeam={this.deleteTeam} />
                        {/*<View style={styles.BottomButtons} >
                            <TouchableOpacity activeOpacity={teams.length < 8 ? 0.2 : 1} onPress={this.addTeam} >
                                <AntDesign name='pluscircleo' size={responsiveFontSize(5)} color={teams.length < 8 ? 'green' : 'grey'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.setPlayingHandler} >
                                <AntDesign name='playcircleo' size={responsiveFontSize(5)} color='brown' />
                            </TouchableOpacity>
                </View>*/}
                    </React.Fragment>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Menu: {
        width: '100%',
        height: '100%'
    },
    Background: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    Logo: {
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(3.5),
        borderWidth: 3,
        borderRadius: 10,
        fontSize: responsiveFontSize(5),
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: '#f0ebeb',
        color: '#0a420a',
        borderColor: '#7a0c02',
        elevation: 12
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
