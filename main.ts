function assignSeekers () {
    for (let value of usedChannels) {
        if (value != hiderChannel) {
            radio.setGroup(value)
            radio.sendString("Seeker")
        }
    }
}
function sendStringToRandomChannel (message: string) {
    currentChannel = usedChannels._pickRandom()
    radio.setGroup(currentChannel)
    radio.sendString(message)
}
function assignRoles () {
    hiderChannel = usedChannels._pickRandom()
    currentChannel = hiderChannel
    radio.setGroup(currentChannel)
    radio.sendString("Hider")
    assignSeekers()
}
input.onButtonPressed(Button.A, function () {
    sendStringToAllChannels("All")
})
function updateChannels () {
    usedChannels.push(currentChannel)
    unusedChannels.shift()
    currentChannel = unusedChannels[0]
    numberOfActiveDevices = activeDevices.length
}
function isDeviceAlreadyInList (ID: string) {
    for (let value of activeDevices) {
        if (value == ID) {
            return 1
        }
    }
    return 0
}
function addPlayer (recievedString: string) {
    activeDevices.push(recievedString)
    radio.sendString("ChannelFound")
    updateChannels()
    radio.setGroup(currentChannel)
}
input.onButtonPressed(Button.AB, function () {
    assignRoles()
})
radio.onReceivedString(function (receivedString) {
    if (unusedChannels.length != 0 && isDeviceAlreadyInList(receivedString) == 0) {
        addPlayer(receivedString)
    }
})
input.onButtonPressed(Button.B, function () {
    sendStringToRandomChannel("Chosen")
})
function sendStringToAllChannels (message: string) {
    for (let value of usedChannels) {
        currentChannel = value
        radio.setGroup(currentChannel)
        radio.sendString(message)
    }
}
function initiateVariables () {
    currentChannel = 0
    hiderChannel = 0
    activeDevices = []
    usedChannels = []
    unusedChannels = [
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120
    ]
    currentChannel = unusedChannels[0]
}
let activeDevices: string[] = []
let numberOfActiveDevices = 0
let unusedChannels: number[] = []
let hiderChannel = 0
let usedChannels: number[] = []
let currentChannel = 0
initiateVariables()
radio.setGroup(currentChannel)
basic.forever(function () {
    basic.showNumber(numberOfActiveDevices)
})
