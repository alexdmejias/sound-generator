var state = true;
var context = new AudioContext();
var osc = context.createOscillator();
osc.frequency.value = 440;
osc.connect(context.destination);
osc.start(0);
var gain = context.createGain();
gain.gain.value = 100;
gain.connect(osc.frequency);
var osc2 = context.createOscillator();
osc2.frequency.value = 1;
osc2.connect(gain);
osc2.start(0);
var toggleButton = document.getElementById('toggle');
toggleButton.addEventListener('click', function () {
    console.log(state);
    if (state) {
        context.suspend();
    }
    else {
        context.resume();
    }
    state = !state;
    console.log('-', state);
});
var controllerOptions = { enableGestures: true };
var Leap = new Leap();
Leap.loop(controllerOptions, function (frame) {
    if (frame.hands.length) {
        var palmPos = frame.hands[0].palmPosition;
        var newOsc = Math.round(map(palmPos[0], -150, 300, -100, 100));
        osc.frequency.value = newOsc;
        updateSlider(0, newOsc);
        var newOsc2 = Math.round(map(palmPos[1], 40, 400, 0, 100));
        osc2.frequency.value = newOsc2;
        updateSlider(1, newOsc2);
        var newGain = map(palmPos[2], -100, 200, 50, 500);
        gain.gain.value = newGain;
        console.log(newGain);
    }
});
function updateSlider(index, value) {
    var slider = document.getElementsByTagName('input')[index];
    var label = document.getElementsByTagName('label')[index];
    slider.value = value;
    label.innerHTML = value;
}
function map(n, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((n - start1) / (stop1 - start1));
}
function clamp(n, min, max) {
    if (n < min)
        return n;
    if (n > max)
        return n;
}
//# sourceMappingURL=app.js.map