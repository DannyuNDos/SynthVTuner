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
};

function main() {
    const noteGroup = SV.getMainEditor().getCurrentGroup().getTarget();
    const selectedNotes = SV.getMainEditor().getSelection().getSelectedNotes();
    if (0 == selectedNotes.length) {
        SV.showMessageBox("Tuner", "Select notes before execution of this script.");
        SV.finish();
        return;
    }
    const form = {
        "title": "Tuner",
        "message": "Enter just interval ratios.",
        "buttons": "OkCancel",
        "widgets": [
            {
                "name": "0", "type": "TextBox",
                "label": "C",
                "default": "1/1"
            },
            {
                "name": "1", "type": "TextBox",
                "label": "D♭",
                "default": "17/16"
            },
            {
                "name": "2", "type": "TextBox",
                "label": "D",
                "default": "9/8"
            },
            {
                "name": "3", "type": "TextBox",
                "label": "E♭",
                "default": "19/16"
            },
            {
                "name": "4", "type": "TextBox",
                "label": "E",
                "default": "5/4"
            },
            {
                "name": "5", "type": "TextBox",
                "label": "F",
                "default": "4/3"
            },
            {
                "name": "6", "type": "TextBox",
                "label": "F♯",
                "default": "17/12"
            },
            {
                "name": "7", "type": "TextBox",
                "label": "G",
                "default": "3/2"
            },
            {
                "name": "8", "type": "TextBox",
                "label": "A♭",
                "default": "19/12"
            },
            {
                "name": "9", "type": "TextBox",
                "label": "A",
                "default": "5/3"
            },
            {
                "name": "10", "type": "TextBox",
                "label": "B♭",
                "default": "16/9"
            },
            {
                "name": "11", "type": "TextBox",
                "label": "B",
                "default": "17/9"
            }
        ]
    };
    const result = SV.showCustomDialog(form);

    if (result.status) {
        const automation = noteGroup.getParameter("pitchDelta");
        for (var i = 0; i < selectedNotes.length; ++i) {
            const note = selectedNotes[i];
            const pitch = Math.round(note.getPitch());
            const pitchMod = pitch % 12;
            const newPitch = strToPitch(result.answers[pitchMod.toString()]) - 100 * pitchMod;
            if (null != newPitch) {
                automation.remove(note.getOnset(), note.getEnd());
                automation.add(note.getOnset(), newPitch);
                automation.add(note.getEnd() - 1, newPitch);
            }
        }
    }
    SV.finish();
};
