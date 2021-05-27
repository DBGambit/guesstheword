import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import Modal from 'react-native-modal';

const Alert = ({teams, setAlerted, ui, target, lang}) => {
    // const [show, setShow] = useState(true)

    const message = () => {
        let m = null
        teams.forEach((team, index) => {
            if (team.alert && !team.alerted) {
                m =  (
                        <Modal
                            isVisible={team.alert && !team.alerted}
                            animationIn='slideInDown'
                            animationInTiming={300}
                            animationOut='slideOutUp'
                            animationOutTiming={300}
                            backdropOpacity={0.3}
                            onBackdropPress={() => setAlerted(index)}
                        >
                            <View style={{
                                    borderWidth: 3,
                                    borderRadius: 15,
                                    borderColor: 'brown',
                                    backgroundColor: '#f0ebeb',
                                    elevation: 12,
                                    width: '80%',
                                    height: responsiveHeight(20),
                                    alignSelf: 'center',
                                    marginBottom: responsiveHeight(25)
                                }} >
                                <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5), color: 'brown', fontWeight: 'bold', marginTop: '3%'}}
                                >{ui.alert}</Text>
                                <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5), color: 'green', fontStyle: 'italic', marginTop: '5%'}}
                                >{lang === 'arm' ? `${team.name}-ը արդեն հավաքել է ${target} միավոր` : lang === 'rus' ? `у ${team.name} уже ${target} очков` : `${team.name} already got ${target} points`}</Text>
                            </View>
                        </Modal>
                    )
            }
        })
        return m
    }

    return (
            message()
        );
};

export default Alert;
