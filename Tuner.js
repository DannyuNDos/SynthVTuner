function getClientInfo() {
    return {
        "name": "Tuner",
        "category": "Playback",
        "author": "Dannyu NDos",
        "versionNumber": 0,
        "minEditorVersion": 67840
    };
};

function strToPitch(str) {
    const numAndDenom = str.split("/");
    if (2 == numAndDenom.length) {
        const num = parseInt(numAndDenom[0]);
        const denom = parseInt(numAndDenom[1]);
        if (0 < num && 0 < denom) {
            return 1200 * Math.log2(num / denom);
        }
    }
    const numAndDenom = str.split("`");
    if (2 == numAndDenom.length) {
        const num = parseInt(numAndDenom[0]);
        const denom = parseInt(numAndDenom[1]);
        if (0 < denom) {
            return 1200 / denom * num;
        }
    }
};

//const tuning = "0`12 1`12 2`12 3`12 4`12 5`12 6`12 7`12 8`12 9`12 10`12 11`12"; // 12edo
//const tuning = "0`19 1`19 3`19 4`19 6`19 8`19 9`19 11`19 12`19 14`19 15`19 17`19"; // 19edo meantone[12] sLsLLsLsLsLL
const tuning = "0`22 2`22 4`22 5`22 7`22 9`22 11`22 13`22 15`22 16`22 18`22 20`22"; // 22edo pajara[12] LLsLLLLLsLLL
//const tuning = "0`31 2`31 5`31 7`31 10`31 13`31 15`31 18`31 20`31 23`31 25`31 28`31"; // 31edo meantone[12] sLsLLsLsLsLL
//const tuning = "1/1 17/16 9/8 19/16 5/4 4/3 17/12 3/2 19/12 5/3 16/9 17/9"; // 19-limit just intonation

function main() {
    const selectedNotes = SV.getMainEditor().getSelection().getSelectedNotes();
    if (0 == selectedNotes.length) {
        SV.showMessageBox("Tuner", "Select notes before execution of this script.");
        SV.finish();
        return;
    }
    const intervals = tuning.split(" ");
    const form = {
        "title": "Tuner",
        "message": "Enter just interval ratios or edosteps.",
        "buttons": "OkCancel",
        "widgets": [
            {
                "name": "0", "type": "TextBox",
                "label": "C",
                "default": intervals[0]
            },
            {
                "name": "1", "type": "TextBox",
                "label": "D♭",
                "default": intervals[1]
            },
            {
                "name": "2", "type": "TextBox",
                "label": "D",
                "default": intervals[2]
            },
            {
                "name": "3", "type": "TextBox",
                "label": "E♭",
                "default": intervals[3]
            },
            {
                "name": "4", "type": "TextBox",
                "label": "E",
                "default": intervals[4]
            },
            {
                "name": "5", "type": "TextBox",
                "label": "F",
                "default": intervals[5]
            },
            {
                "name": "6", "type": "TextBox",
                "label": "F♯",
                "default": intervals[6]
            },
            {
                "name": "7", "type": "TextBox",
                "label": "G",
                "default": intervals[7]
            },
            {
                "name": "8", "type": "TextBox",
                "label": "A♭",
                "default": intervals[8]
            },
            {
                "name": "9", "type": "TextBox",
                "label": "A",
                "default": intervals[9]
            },
            {
                "name": "10", "type": "TextBox",
                "label": "B♭",
                "default": intervals[10]
            },
            {
                "name": "11", "type": "TextBox",
                "label": "B",
                "default": intervals[11]
            }
        ]
    };
    const result = SV.showCustomDialog(form);

    if (result.status) {
        for (var i = 0; i < selectedNotes.length; ++i) {
            const note = selectedNotes[i];
            const pitch = Math.round(note.getPitch());
            const pitchMod = pitch % 12;
            const newPitch = strToPitch(result.answers[pitchMod.toString()]) - 100 * pitchMod;
            if (null != newPitch) {
                note.setDetune(newPitch);
            }
        }
    }
    SV.finish();
};

