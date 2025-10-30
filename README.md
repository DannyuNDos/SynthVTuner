# Tuner
A script for tuning individual notes microtonally in SynthV.

## How to use

### Installation
Copy the attached JavaScript file to the `scripts` folder, as shown in https://sv2.docs.dreamtonics.com/en/scripts.

### Execution
In the SynthV Studio, select the notes you want to tune microtonally, enter just intervals (`3/2`, `5/4`, etc.) or edosteps (`11\19`, `13\22`, etc.) into each tone, and then press the button in the `Tuner` sub-panel in the scripts panel. If this doesn't appear in the scripts panel, execute `Scripts > Rescan`, and try again.

### Configuration
In the attached JavaScript file, you'll notice that there is the constant `tuning` in midst of the code.

There are 6 presets, namely 12edo, 19edo meantone\[12\] sLsLLsLsLsLL, 22edo pajara\[12\] LLsLLLLLsLLL, 31edo meantone\[12\] sLsLLsLsLsLL, 12edo subset of 72edo, and a 19-limit just intonation.

You may add a new preset by the exactly name format, namely the stringified intervals intercalated by a single whitespace (` `). When adding a preset consisting of edosteps, be sure to escape the backslash (`\\`).

## Caveats
You need SynthV Studio 2 Pro, with version of at least 2.1.2, to use this script.

This script is guaranteed to work only under the standalone version of SynthV. Under the plugin version of SynthV, this script may suffer compatibility issues.
