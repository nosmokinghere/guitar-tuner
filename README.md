# Pegbox

Reference-pitch guitar tuner. Open **Tuner**, then tap a string. Each button plays concert pitch for standard tuning (E A D G B E). The neck lights the string you just heard.

A4 = 440 Hz.

## Install

```sh
omarchy plugin add https://github.com/nosmokinghere/guitar-tuner.git --enable
omarchy bar put solfredag.guitar-tuner '{"section":"right"}'
```

## Use

- Open the Tuner drop-down
- Six buttons, low to high: E₂ A₂ D₃ G₃ B₃ E₄
- Tap a string on the neck to play the same pitch
- Volume lives in the header

## Strings

| String | Note | Hz |
| --- | --- | --- |
| 6 | E₂ | 82.41 |
| 5 | A₂ | 110.00 |
| 4 | D₃ | 146.83 |
| 3 | G₃ | 196.00 |
| 2 | B₃ | 246.94 |
| 1 | E₄ | 329.63 |

Match each open string to the tone, then move on.

## License

MIT

## Remove

```sh
omarchy bar remove solfredag.guitar-tuner
omarchy plugin remove solfredag.guitar-tuner
```
