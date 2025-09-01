# Tuner
A script for tuning individual notes microtonally in SynthV.

## How to use

### Installation
Copy the attached JavaScript file to the `scripts` folder, as shown in https://sv2.docs.dreamtonics.com/en/scripts.

### Execution
In the SynthV Studio, select the notes you want to tune microtonally, then execute `Scripts > Playback > Tuner` in the menu. If this doesn't appear in the menu, execute `Scripts > Rescan`, and try again.

A dialog will appear. Enter just intervals (`3/2`, `5/4`, etc.) or edosteps (``11`19``, ``13`22``, etc; note that a backtick is used, rather than a backslash) into each tone, and press "OK". The unison (`1/1`) will always be treated as the default "C" tone.

### Configuration
In the attached JavaScript file, you'll notice that there is the constant `tuning` in midst of the code.

There are 5 presets, namely 12edo, 19edo meantone\[12\] sLsLLsLsLsLL, 22edo pajara\[12\] LLsLLLLLsLLL, 31edo meantone\[12\] sLsLLsLsLsLL, and a 19-limit just intonation. The preset enabled as the default is the 22edo one, while the others are commented out by the prepended double slash (`\\`). You may enable another preset by removing `\\` in front of the preset and commenting out the other presets.

You may also add a new preset by the exactly name format, namely the stringified intervals intercalated by a single whitespace (` `). Again, be sure to comment out the other presets.

## Caveats
You need SynthV Studio 2 Pro to use this script.

This script is guaranteed to work only under the standalone version of SynthV. Under the plugin version of SynthV, this script may suffer compatibility issues.
