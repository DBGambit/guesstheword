import { Audio } from 'expo-av';

import clickSound from './jjj.mp3'

const clickPlay = async () => {
    const {sound} = await Audio.Sound.createAsync(clickSound)
    await sound.playAsync()
}

