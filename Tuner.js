function getClientInfo() {
    return {
        "name": "Tuner",
        "category": "Playback",
        "author": "Dannyu NDos",
        "versionNumber": 0,
        "minEditorVersion": 131330,
        "type": "SidePanelSection"
    };
};

const TITLE = "TUNER";
const MESSAGE1 = "Enter intervals in just intonation or edosteps.";
const MESSAGE2 = "Select the notes you want to tune, and press the button below.";
const BASENOTE = "Base note";
const PRESET = "Presets"
const INTERVALS = "Intervals list";
const BUTTON_TEXT = "Tune";
function getTranslations(langCode) {
    if (langCode == "ja-jp") {
        return [
            [TITLE, "チューナー"],
            [MESSAGE1, "音程を純正調かEDOステップで入力してください。"],
            [MESSAGE2, "音符たちを選択して、ボタンを押してください。"],
            [BASENOTE, "基準音"],
            [PRESET, "プリセット"],
            [INTERVALS, "音程のリスト"],
            [BUTTON_TEXT, "調律する"]
        ];
    }
    else if (langCode == "zh-cn") {
        return [
            [TITLE, "调音器"],
            [MESSAGE1, "输入音程用纯律或EDO-步。"],
            [MESSAGE2, "选择音符们，按下按键。"],
            [BASENOTE, "基准音"],
            [PRESET, "预调"],
            [INTERVALS, "音程列表"],
            [BUTTON_TEXT, "调音"]
        ];
    }
    else if (langCode == "zh-tw") {
        return [
            [TITLE, "調音器"],
            [MESSAGE1, "輸入音程用純律或EDO-步。"],
            [MESSAGE2, "選擇音符們，按下按鍵。"],
            [BASENOTE, "基準音"],
            [PRESET, "預設"],
            [INTERVALS, "音程列表"],
            [BUTTON_TEXT, "調音"]
        ];
    }
    else if (langCode == "ko-kr") {
        return [
            [TITLE, "튜너"],
            [MESSAGE1, "음정들을 순정률이나 EDO-스텝을 써서 입력하세요."],
            [MESSAGE2, "음표들을 선택하고, 버튼을 눌러주세요."],
            [BASENOTE, "기준음"],
            [PRESET, "프리셋"],
            [INTERVALS, "음정 리스트"],
            [BUTTON_TEXT, "조율하기"]
        ];
    }
    else if (langCode == "fr-fr") {
        return [
            [TITLE, "ACCORDEUR"],
            [MESSAGE1, "Notez les intervalles en l'intonation juste ou edosteps."],
            [MESSAGE2, "Sélectionnez des notes, et appuyez sur le bouton."],
            [BASENOTE, "Note de base"],
            [PRESET, "Pré-réglés"],
            [INTERVALS, "Liste des intervalles"],
            [BUTTON_TEXT, "Réglez"]
        ];
    }
    else if (langCode == "es-la") {
        return [
            [TITLE, "AFINADOR"],
            [MESSAGE1, "Escriba los intervalos en el temperamento justo o edosteps."],
            [MESSAGE2, "Seleccione notas, y apriete el botón."],
            [BASENOTE, "Nota base"],
            [PRESET, "Preajustes"],
            [INTERVALS, "Lista de intervalos"],
            [BUTTON_TEXT, "Afine"]
        ];
    }
}

function baseNoteToMidiPitch(str) {
    const octave = parseInt(str.slice(-1));
    const note = str.slice(0, -1);
    switch (note) {
        case "B#": case "C":
            return 0 + 60 + (octave - 4) * 12;
        case "C#": case "Db":
            return 1 + 60 + (octave - 4) * 12;
        case "D":
            return 2 + 60 + (octave - 4) * 12;
        case "D#": case "Eb":
            return 3 + 60 + (octave - 4) * 12;
        case "E": case "Fb":
            return 4 + 60 + (octave - 4) * 12;
        case "E#": case "F":
            return 5 + 60 + (octave - 4) * 12;
        case "F#": case "Gb":
            return 6 + 60 + (octave - 4) * 12;
        case "G":
            return 7 + 60 + (octave - 4) * 12;
        case "G#": case "Ab":
            return 8 + 60 + (octave - 4) * 12;
        case "A":
            return 9 + 60 + (octave - 4) * 12;
        case "A#": case "Bb":
            return 10 + 60 + (octave - 4) * 12;
        case "B": case "Cb":
            return 11 + 60 + (octave - 4) * 12;
    }
    SV.showMessageBox("Invalid base note: " + str);
    SV.finish();
}
function strToCents(str) {
    const numAndDenom = str.split("/");
    if (2 == numAndDenom.length) {
        const num = parseInt(numAndDenom[0]);
        const denom = parseInt(numAndDenom[1]);
        if (0 < num && 0 < denom) {
            return 1200 * Math.log2(num / denom);
        }
    }
    const numAndDenom = str.split("\\");
    if (2 == numAndDenom.length) {
        const num = parseInt(numAndDenom[0]);
        const denom = parseInt(numAndDenom[1]);
        if (0 < denom) {
            return 1200 / denom * num;
        }
    }
    SV.showMessageBox("Invalid interval: " + str);
    SV.finish();
};

tuning = {
    "12edo": ["1\\12", "2\\12", "3\\12", "4\\12", "5\\12", "6\\12", "7\\12", "8\\12", "9\\12", "10\\12", "11\\12", "12\\12"],
    "19edo meantone[12] sLsLLsLsLsLL": ["1\\19", "3\\19", "4\\19", "6\\19", "8\\19", "9\\19", "11\\19", "12\\19", "14\\19", "15\\19", "17\\19", "19\\19"],
    "22edo pajara[12] LLsLLLLLsLLL": ["2\\22", "4\\22", "5\\22", "7\\22", "9\\22", "11\\22", "13\\22", "15\\22", "16\\22", "18\\22", "20\\22", "22\\22"],
    "31edo meantone[12] sLsLLsLsLsLL": ["2\\31", "5\\31", "7\\31", "10\\31", "13\\31", "15\\31", "18\\31", "20\\31", "23\\31", "25\\31", "28\\31", "31\\31"],
    "12edo subset of 72edo": ["6\\72", "12\\72", "18\\72", "24\\72", "30\\72", "36\\72", "42\\72", "48\\72", "54\\72", "60\\72", "66\\72", "72\\72"],
    "19-limit just intonation": ["17/16", "9/8", "19/16", "5/4", "4/3", "17/12", "3/2", "19/12", "5/3", "16/9", "17/9", "2/1"],
    "7-limit just intonation": ["21/20", "9/8", "7/6", "5/4", "21/16", "7/5", "3/2", "63/40", "5/3", "7/4", "15/8", "2/1"]
};

var textBoxValue = SV.create("WidgetValue");
textBoxValue.setValue("C4");

var comboValue = SV.create("WidgetValue");
comboValue.setValue(0);

var textAreaValue = SV.create("WidgetValue");
textAreaValue.setValue(tuning["12edo"].join("\n"));

comboValue.setValueChangeCallback(function (newValue) {
    textAreaValue.setValue(tuning[Object.keys(tuning)[newValue]].join("\n"));
});

var buttonValue = SV.create("WidgetValue");
buttonValue.setValueChangeCallback(function () {
    const intervals = [0].concat(textAreaValue.getValue().trim().split(/\s+/).map(strToCents));
    const period = intervals[intervals.length - 1];
    const notes = SV.getMainEditor().getSelection().getSelectedNotes();
    for (var i = 0; i < notes.length; ++i) {
        const note = notes[i];
        const cents = ((100 * (
            note.getPitch() - baseNoteToMidiPitch(textBoxValue.getValue())
        ) + note.getDetune()) % period + period) % period;
        const detuneAmountCandidates = intervals.map(function (interval) {
            return interval - cents;
        })
        const detuneAmount = detuneAmountCandidates.reduce(function (prev, curr) {
            return Math.abs(curr) < Math.abs(prev) ? curr : prev;
        }, detuneAmountCandidates[0]);
        note.setDetune(note.getDetune() + detuneAmount);
    }
});

Array.prototype.flatMap = function (mapper) {
    var result = [];
    for (var i = 0; i < this.length; ++i) {
        result = result.concat(mapper(this[i]));
    }
    return result;
}

function getSidePanelSectionState() {
    return {
        "title": SV.T(TITLE),
        "rows": [
            {
                "type": "Label",
                "text": "1. " + SV.T(MESSAGE1)
            },
            {
                "type": "Label",
                "text": "2. " + SV.T(MESSAGE2)
            },
            {
                "type": "Label",
                "text": SV.T(BASENOTE) + ":"
            },
            {
                "type": "Container",
                "columns": [
                    {
                        "type": "TextBox",
                        "value": textBoxValue
                    }
                ]
            },
            {
                "type": "Label",
                "text": SV.T(PRESET) + ":"
            },
            {
                "type": "Container",
                "columns": [
                    {
                        "type": "ComboBox",
                        "choices": Object.keys(tuning),
                        "value": comboValue
                    }
                ]
            },
            {
                "type": "Label",
                "text": SV.T(INTERVALS) + ":"
            },
            {
                "type": "Container",
                "columns": [
                    {
                        "type": "TextArea",
                        "value": textAreaValue,
                        "height": 300
                    }
                ]
            },
            {
                "type": "Container",
                "columns": [
                    {
                        "type": "Button",
                        "text": SV.T(BUTTON_TEXT),
                        "value": buttonValue
                    }
                ]
            }
        ]
    };
}
