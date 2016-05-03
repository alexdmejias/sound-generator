System.register(['./node_modules/leapmotion-ts/build/leapmotionts-2.2.4'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Leap;
    var state, context, osc, gain, osc2, toggleButton, controllerOptions, controller;
    function updateSlider(index, value) {
        var slider = document.getElementsByTagName('input')[index];
        var label = document.getElementsByTagName('label')[index];
        slider.value = value.toString();
        label.innerHTML = value.toString();
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
    return {
        setters:[
            function (Leap_1) {
                Leap = Leap_1;
            }],
        execute: function() {
            state = true;
            context = new AudioContext();
            osc = context.createOscillator();
            osc.frequency.value = 440;
            osc.connect(context.destination);
            osc.start(0);
            gain = context.createGain();
            gain.gain.value = 100;
            gain.connect(osc.frequency);
            osc2 = context.createOscillator();
            osc2.frequency.value = 1;
            osc2.connect(gain);
            osc2.start(0);
            toggleButton = document.getElementById('toggle');
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
            controllerOptions = { enableGestures: true };
            controller = new Leap.Controller();
            controller.addEventListener(Leap.LeapEvent.LEAPMOTION_FRAME, (event) => {
                var frame = event.frame;
                if (frame.hands.length) {
                    var palmPos = frame.hands[0].palmPosition;
                    var newOsc = Math.round(map(palmPos.x, -150, 300, -100, 100));
                    osc.frequency.value = Math.round(newOsc);
                    updateSlider(0, newOsc);
                    var newOsc2 = Math.round(map(palmPos.y, 40, 400, 0, 100));
                    osc2.frequency.value = Math.round(newOsc2);
                    updateSlider(1, newOsc2);
                    var newGain = map(palmPos.z, -100, 200, 50, 500);
                    gain.gain.value = Math.round(newGain);
                    console.log(newGain);
                }
            });
        }
    }
});
//# sourceMappingURL=app.js.map