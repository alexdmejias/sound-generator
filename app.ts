import * as Leap from './node_modules/leapmotion-ts/build/leapmotionts-2.2.4';

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
toggleButton.addEventListener('click', function() {
  console.log(state)
  if (state) {
    context.suspend();
  } else {
    context.resume();
  }
  state = !state;
  console.log('-', state)
});

var controllerOptions = {enableGestures: true};
var controller = new Leap.Controller();
controller.addEventListener(Leap.LeapEvent.LEAPMOTION_FRAME, (event:Leap.LeapEvent) => {
var frame:Leap.Frame = event.frame;

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

    console.log(newGain)
  }

});


function updateSlider(index: number, value: number): void {
  var slider = document.getElementsByTagName('input')[index];
  var label = document.getElementsByTagName('label')[index];
  slider.value = value.toString();
  label.innerHTML = value.toString();
}


function map(n: number, start1: number, stop1: number, start2: number, stop2: number): number {
  return start2 + (stop2 - start2) * ((n - start1) / (stop1 - start1));
}

function clamp(n: number, min: number, max: number): number {
  if (n < min) return n;
  if (n > max) return n;
}