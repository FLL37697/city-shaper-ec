let currentTime = 0
let armPos = 0
let motoraAdjustment = 0
let loopStart = 0
let lastArmPos = 0
let startOffset = 0
let increment = 0
radioactiveBrainstorm.addMenuItem("crane2", function () {
    crane2()
})
radioactiveBrainstorm.addMenuItem("crane1", function () {
    crane1()
})
function armUp() {
    motors.mediumA.run(20, startOffset, MoveUnit.MilliSeconds)
    lastArmPos = motors.mediumA.angle()
    brick.showValue("lastArmPosInit", lastArmPos, 4)
    pause(100)
    while (true) {
        motors.mediumA.run(20, increment, MoveUnit.MilliSeconds)
        armPos = motors.mediumA.angle()
        brick.showValue("lastArmPos", lastArmPos, 1)
        brick.showValue("armPos", armPos, 2)
        brick.showValue("Difference", armPos - lastArmPos, 3)
        if (lastArmPos - armPos == 0) {
            music.playSoundEffect(sounds.communicationBravo)
            break;
        }
        lastArmPos = armPos
    }
}
function crane2() {
    motors.resetAll()
    radioactiveBrainstorm.moveUntilStall(motors.mediumA, radioactiveBrainstorm.Direction.UP, 30, 40, 100, false)
motors.largeBC.steer(0, 40, 2.5, MoveUnit.Rotations)
    motors.largeBC.tank(10, -10, 0.25, MoveUnit.Rotations)
    motors.largeBC.steer(0, 50, 0.75, MoveUnit.Rotations)
    motors.largeBC.tank(-10, 10, 0.25, MoveUnit.Rotations)
    motors.largeBC.steer(0, 40, 0.45, MoveUnit.Rotations)
    radioactiveBrainstorm.moveUntilStall(motors.mediumA, radioactiveBrainstorm.Direction.DOWN, 20, 10, 100, true)
    motors.largeBC.steer(0, -40, 0.45, MoveUnit.Rotations)
    motors.stopAll()
    motors.resetAll()
    motors.largeBC.tank(-10, 10, 0.25, MoveUnit.Rotations)
    radioactiveBrainstorm.moveUntilStall(motors.mediumA, radioactiveBrainstorm.Direction.DOWN, 20, 10, 100, true)
    motors.largeBC.steer(0, 40, 0.45, MoveUnit.Rotations)
    motors.largeBC.tank(10, -10, 0.25, MoveUnit.Rotations)
    motors.largeBC.steer(0, 40, 0.05, MoveUnit.Rotations)
    motors.stopAll()
    radioactiveBrainstorm.moveUntilStall(motors.mediumA, radioactiveBrainstorm.Direction.UP, 20, 10, 100, true)
}
function crane1() {
    armUp()
    motors.largeBC.steer(0, 50, 2.25, MoveUnit.Rotations)
    loopStart = control.millis()
    while (currentTime - loopStart < 1600) {
        motoraAdjustment = sensors.color1.light(LightIntensityMode.Reflected) - 40
        motors.largeBC.steer(motoraAdjustment, 25)
        currentTime = control.millis()
    }
    motors.largeBC.stop()
    motors.largeBC.tank(21, -21, 0.1, MoveUnit.Rotations)
    motors.largeBC.steer(0, 35, 0.35, MoveUnit.Rotations)
    armDown()
    motors.largeBC.steer(0, -25, 0.4, MoveUnit.Rotations)
    armUp()
    motors.largeBC.steer(0, -25, 0.1, MoveUnit.Rotations)
    motors.largeBC.tank(-5, 5, 0.05, MoveUnit.Rotations)
    armDown()
    motors.largeBC.steer(0, 25, 0.2, MoveUnit.Rotations)
    armUp()
}
function armDown() {
    motors.mediumA.run(-20, startOffset, MoveUnit.MilliSeconds)
    lastArmPos = motors.mediumA.angle()
    brick.showValue("lastArmPosInit", lastArmPos, 4)
    pause(100)
    while (true) {
        motors.mediumA.run(-20, increment, MoveUnit.MilliSeconds)
        armPos = motors.mediumA.angle()
        brick.showValue("lastArmPos", lastArmPos, 1)
        brick.showValue("armPos", armPos, 2)
        brick.showValue("Difference", armPos - lastArmPos, 3)
        if (lastArmPos - armPos == 0) {
            music.playSoundEffect(sounds.communicationBravo)
            break;
        }
        lastArmPos = armPos
    }
}
increment = 10
startOffset = 100
forever(function () {
	
})
