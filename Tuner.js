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
const PRESET = "Presets"
const BUTTON_TEXT = "Tune";
function getTranslations(langCode) {
    if (langCode == "ja-jp") {
        return [
            [TITLE, "チューナー"],
            [MESSAGE1, "音程を純正調かEDOステップで入力してください。"],
            [MESSAGE2, "音符たちを選択して、ボタンを押してください。"],
            [PRESET, "プリセット"],
            [BUTTON_TEXT, "調律する"]
        ];
    }
    else if (langCode == "zh-cn") {
        return [
            [TITLE, "调音器"],
            [MESSAGE1, "输入音程用纯律或EDO-步。"],
            [MESSAGE2, "选择音符们，按下按键。"],
            [PRESET, "预调"],
            [BUTTON_TEXT, "调音"]
        ];
    }
    else if (langCode == "zh-tw") {
        return [
            [TITLE, "調音器"],
            [MESSAGE1, "輸入音程用純律或EDO-步。"],
            [MESSAGE2, "選擇音符們，按下按鍵。"],
            [PRESET, "預設"],
            [BUTTON_TEXT, "調音"]
        ];
    }
    else if (langCode == "ko-kr") {
        return [
            [TITLE, "튜너"],
            [MESSAGE1, "음정들을 순정률이나 EDO-스텝을 써서 입력하세요."],
            [MESSAGE2, "음표들을 선택하고, 버튼을 눌러주세요."],
            [PRESET, "프리셋"],
            [BUTTON_TEXT, "조율하기"]
        ];
    }
    else if (langCode == "fr-fr") {
        return [
            [TITLE, "ACCORDEUR"],
            [MESSAGE1, "Notez les intervalles en l'intonation juste ou edosteps."],
            [MESSAGE2, "Sélectionnez des notes, et appuyez sur le bouton."],
            [PRESET, "Pré-réglés"],
            [BUTTON_TEXT, "Réglez"]
        ];
    }
    else if (langCode == "es-la") {
        return [
            [TITLE, "AFINADOR"],
            [MESSAGE1, "Escriba los intervalos en el temperamento justo o edosteps."],
            [MESSAGE2, "Seleccione notas, y apriete el botón."],
            [PRESET, "Preajustes"],
            [BUTTON_TEXT, "Afine"]
        ];
    }
}

function strToPitch(str) {
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
};

tuning = {
    "12edo": "0\\12 1\\12 2\\12 3\\12 4\\12 5\\12 6\\12 7\\12 8\\12 9\\12 10\\12 11\\12",
    "19edo meantone[12] sLsLLsLsLsLL": "0\\19 1\\19 3\\19 4\\19 6\\19 8\\19 9\\19 11\\19 12\\19 14\\19 15\\19 17\\19",
    "22edo pajara[12] LLsLLLLLsLLL": "0\\22 2\\22 4\\22 5\\22 7\\22 9\\22 11\\22 13\\22 15\\22 16\\22 18\\22 20\\22",
    "31edo meantone[12] sLsLLsLsLsLL": "0\\31 2\\31 5\\31 7\\31 10\\31 13\\31 15\\31 18\\31 20\\31 23\\31 25\\31 28\\31",
    "12edo subset of 72edo": "0\\72 6\\72 12\\72 18\\72 24\\72 30\\72 36\\72 42\\72 48\\72 54\\72 60\\72 66\\72",
    "19-limit just intonation": "1/1 17/16 9/8 19/16 5/4 4/3 17/12 3/2 19/12 5/3 16/9 17/9"
};

var comboValue = SV.create("WidgetValue");
comboValue.setValue(0);

var textValues = {
    "C": SV.create("WidgetValue"),
    "C♯": SV.create("WidgetValue"),
    "D": SV.create("WidgetValue"),
    "D♯": SV.create("WidgetValue"),
    "E": SV.create("WidgetValue"),
    "F": SV.create("WidgetValue"),
    "F♯": SV.create("WidgetValue"),
    "G": SV.create("WidgetValue"),
    "G♯": SV.create("WidgetValue"),
    "A": SV.create("WidgetValue"),
    "A♯": SV.create("WidgetValue"),
    "B": SV.create("WidgetValue")
};

const textValues_keys = Object.keys(textValues);

for (var i = 0; i < textValues_keys.length; ++i) {
    textValues[textValues_keys[i]].setValue(tuning["12edo"].split(" ")[i]);
}

comboValue.setValueChangeCallback(function (newValue) {
    for (var i = 0; i < textValues_keys.length; ++i) {
        textValues[textValues_keys[i]].setValue(tuning[Object.keys(tuning)[newValue]].split(" ")[i]);
    }
});

var buttonValue = SV.create("WidgetValue");
buttonValue.setValueChangeCallback(function () {
    const notes = SV.getMainEditor().getSelection().getSelectedNotes();
    for (var i = 0; i < notes.length; ++i) {
        const semitones = (notes[i].getPitch() - 60) % 12;
        notes[i].setDetune(strToPitch(textValues[textValues_keys[semitones]].getValue()) - 100 * semitones);
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
            }
        ].concat(textValues_keys.flatMap(function (key) {
            return [
                {
                    "type": "Label",
                    "text": key
                },
                {
                    "type": "Container",
                    "columns": [
                        {
                            "type": "TextBox",
                            "value": textValues[key]
                        }
                    ]
                }
            ];
        })).concat([
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
        ])
    };
}
