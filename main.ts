bluetooth.onBluetoothConnected(function () {
    connected = 1
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
let time2 = 0
let time1 = 0
let count_signal = 0
let threshold = 0
let signal = 0
let connected = 0
connected = 0
bluetooth.startUartService()
basic.showLeds(`
    . . . . .
    . . # . .
    . # # # .
    . . # . .
    . . . . .
    `)
basic.forever(function () {
    basic.pause(10)
    if (connected == 1) {
        signal = pins.analogReadPin(AnalogPin.P0)
        bluetooth.uartWriteLine("" + convertToText(Math.round(signal)) + " " + convertToText(Math.round(signal)))
        serial.writeLine("" + (Math.round(signal)))
        threshold = 500
        if (Math.round(signal) == threshold && count_signal == 0) {
            time1 = input.runningTime()
            count_signal = 1
            serial.writeLine("" + (Math.round(signal)))
        } else if (Math.round(signal) == threshold && count_signal == 1) {
            count_signal = 2
            serial.writeLine("" + (Math.round(signal)))
        } else if (Math.round(signal) == threshold && count_signal == 2) {
            time2 = input.runningTime()
            serial.writeLine("" + (Math.round(signal)))
        } else {
            serial.writeLine("" + (Math.round(signal)))
        }
    }
})
