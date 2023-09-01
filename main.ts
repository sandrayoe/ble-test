bluetooth.onBluetoothConnected(function () {
    connected = 1
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
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
        led.toggle(0, 0)
    }
})
