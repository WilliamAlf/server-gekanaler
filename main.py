def geRoller(spelare: number):
    global hiderChannel, currentChannel3
    sendStringToAllChannels("Seeker")
    hiderChannel = unusedChannels[randint(0, len(activeDevices))]
    currentChannel3 = hiderChannel
    radio.send_string("Hider")

def on_button_pressed_a():
    geRoller(numberOfActiveDevices)
input.on_button_pressed(Button.A, on_button_pressed_a)

def isDeviceAlreadyInList(ID: str):
    list2: List[str] = []
    for value in list2:
        if value == ID:
            return 1
    return 0
def sendNumberToAllChannels(number: number):
    for currentChannel in unusedChannels:
        currentChannel = currentChannel
        radio.send_number(number)

def on_received_string(receivedString):
    global currentChannel3, numberOfActiveDevices
    if len(unusedChannels) != 0 and isDeviceAlreadyInList(receivedString) == 0:
        activeDevices.append(receivedString)
        radio.send_number(0)
        usedChannels.append(currentChannel3)
        currentChannel3 = unusedChannels[0]
        unusedChannels.shift()
        numberOfActiveDevices = len(activeDevices)
radio.on_received_string(on_received_string)

def sendStringToAllChannels(message: str):
    for currentChannel2 in unusedChannels:
        currentChannel2 = currentChannel2
        radio.send_string(message)
numberOfActiveDevices = ""
hiderChannel = ""
usedChannels: List[str] = []
currentChannel3 = ""
unusedChannels: List[str] = []
activeDevices: List[str] = []
activeDevices = []
unusedChannels = [113, 114, 115, 116, 117, 118, 119, 120]
currentChannel3 = unusedChannels[0]
usedChannels = []

def on_forever():
    radio.set_group(currentChannel3)
    basic.show_number(numberOfActiveDevices)
basic.forever(on_forever)
