import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Ui
import "Tone.js" as Tone

Panel {
  id: root
  moduleName: "solfredag.guitar-tuner"
  manageIpc: false

  property var anchorItem: null
  property var hostWidget: null
  property int activeId: 0

  function open() { root.controller.show() }
  function close() { root.controller.hide() }
  function switchPanel(direction) {
    if (root.bar && typeof root.bar.switchPanelFrom === "function")
      root.bar.switchPanelFrom(root.hostWidget || root, direction)
    return false
  }

  function playString(s) {
    root.activeId = s.id
    if (root.hostWidget)
      root.hostWidget.lastNote = s.label
    player.running = false
    player.command = Tone.playCommand(s.freq)
    player.running = true
  }

  Process {
    id: player
    running: false
  }

  KeyboardPanel {
    id: panel
    anchorItem: root.anchorItem
    owner: root.hostWidget || root
    bar: root.bar
    open: root.opened
    focusTarget: keyCatcher
    contentWidth: panel.fittedContentWidth(Style.space(360))
    contentHeight: panel.fittedContentHeight(content.implicitHeight)

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      onCloseRequested: root.close()
      onTabRequested: function(direction) { root.switchPanel(direction) }

      Column {
        id: content
        width: parent.width
        spacing: Style.space(8)

        Text {
          width: parent.width
          text: "Standard tuning"
          color: root.barForeground
          font.family: root.bar ? root.bar.fontFamily : Style.font.family
          font.pixelSize: Style.font.caption
        }

        Text {
          width: parent.width
          text: "E A D G B E"
          color: root.barForeground
          font.family: root.bar ? root.bar.fontFamily : Style.font.family
          font.pixelSize: Style.font.body
          font.bold: true
        }

        Grid {
          width: parent.width
          columns: 3
          columnSpacing: Style.space(6)
          rowSpacing: Style.space(6)

          Repeater {
            model: Tone.strings
            delegate: Rectangle {
              required property var modelData
              width: (content.width - Style.space(12)) / 3
              height: 52
              radius: 8
              color: root.activeId === modelData.id ? root.barForeground : Qt.rgba(1, 1, 1, 0.08)

              MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: root.playString(modelData)
              }

              Column {
                anchors.centerIn: parent
                spacing: 2

                Text {
                  anchors.horizontalCenter: parent.horizontalCenter
                  text: modelData.name + modelData.octave
                  color: root.activeId === modelData.id
                    ? (root.bar && root.bar.background ? root.bar.background : "#14130f")
                    : root.barForeground
                  font.family: root.bar ? root.bar.fontFamily : Style.font.family
                  font.pixelSize: Style.font.body
                  font.bold: true
                }

                Text {
                  anchors.horizontalCenter: parent.horizontalCenter
                  text: modelData.id + " · " + modelData.freq
                  color: root.activeId === modelData.id
                    ? (root.bar && root.bar.background ? root.bar.background : "#14130f")
                    : root.barForeground
                  opacity: 0.7
                  font.family: root.bar ? root.bar.fontFamily : Style.font.family
                  font.pixelSize: Style.font.caption
                }
              }
            }
          }
        }

        Text {
          width: parent.width
          wrapMode: Text.WordWrap
          text: "Tap a string to hear concert pitch. A4 = 440 Hz."
          color: root.barForeground
          opacity: 0.7
          font.family: root.bar ? root.bar.fontFamily : Style.font.family
          font.pixelSize: Style.font.caption
        }
      }
    }
  }
}
