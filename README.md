# SynthVTuner
A script for tuning individual notes microtonally in SynthV.

## How to use

### Installation
Copy the attached JavaScript file to the `scripts` folder, as shown in https://manual.synthv.info/advanced/scripting/#adding-new-scripts.

### Execution
In the SynthV Studio, select the notes you want to tune microtonally, then execute `Scripts > Playback > Tuner` in the menu. If this doesn't appear in the menu, execute `Scripts > Rescan`, and try again.

A dialog will appear. Enter just intervals (`3/2`, `5/4`, etc.) into each tone, and press "OK". The tonic (indicated by the unison `1/1`) will always be treated as the default "C" tone.

## Caveats
You need SynthV Pro to use this script.

In this script, the method of tuning is to employ the "pitch deviation" automation. As such, every pitch deviation you already wrote into the automation will be erased.

Using this script along with SynthV Pro's native note detuning (which is able to detune notes by 25 cents) is not advisable.

This script is guaranteed to work only under the standalone version of SynthV. Under the plugin version of SynthV, this script may suffer compatibility issues.
