# Tuner
A script for tuning individual notes microtonally in SynthV.

## How to use

### Installation
Copy the attached JavaScript file to the `scripts` folder, as accessible by executing `Scripts > Open Scripts Folder` in the menu of SynthV.

### Execution
Navigate into the scripts panel. You'll see the "Tuner" sub-panel. If this doesn't appear in the scripts panel, execute `Scripts > Rescan` in the menu, and try again.

Select the notes you want to tune microtonally, then enter just intervals (`3/2`, `5/4`, etc.) or edosteps (`11\19`, `13\22`, etc.) into the "Intervals list" text area, and then press the button. Then the selected notes will be snapped by the inputted intervals, where the bottommost interval (typically an octave) will be the period.

You can adjust the base note (that is, the note targeted by the unison interval) in the "Base note" textbox. This is set to `C4` by default.

### Configuration
In the attached JavaScript file, you'll notice that there is the constant `tuning` in midst of the code.

There are 7 presets, namely 12edo, 19edo meantone\[12\] sLsLLsLsLsLL, 22edo pajara\[12\] LLsLLLLLsLLL, 31edo meantone\[12\] sLsLLsLsLsLL, 12edo subset of 72edo, a 19-limit just intonation, and a 7-limit just intonation.

You may add a new preset by the exactly same format, namely the stringified intervals. When adding a preset consisting of edosteps, be sure to escape the backslash (`\\`).

## Caveats
You need SynthV Studio 2 Pro, with version of at least 2.1.2, to use this script.

This script is guaranteed to work only under the standalone version of SynthV. Under the plugin version of SynthV, this script may suffer compatibility issues.
