let toStr = Object.prototype.toString;
export const deepCopy = (obj) => {
    let newObj;
    switch (typeof obj) {
        case "object":
            if (obj === null) {
                newObj = null;
            } else {
                switch (toStr.call(obj)) {
                    case "[object Array]":
                        newObj = obj.map(deepCopy);
                        break;
                    default:
                        newObj = Object.keys(obj).reduce((prev, key) => {
                            prev[key] = deepCopy(obj[key]);
                            return prev;
                        }, {});
                        break;
                }
            }
            break;
        default:
            newObj = obj;
            break;
    }
    return newObj;
}

export const langTeams = (lang) => {
    let teams = [
            {
                name: lang === 'arm' ? 'Թիմ 1' : lang === 'eng' ? 'Team 1' : 'Команда 1',
                guessedWords: [],
                changingName: false,
                id: 1,
                turn: false,
                alert: false,
                alerted: false
            },
            {
                name: lang === 'arm' ? 'Թիմ 2' : lang === 'eng' ? 'Team 2' : 'Команда 2',
                guessedWords: [],
                changingName: false,
                id: 2,
                turn: false,
                alert: false,
                alerted: false
            }
        ]
    return teams
}

