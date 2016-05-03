interface AudioContext {

    activeSourceCount: number; 
    createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer;
    createBuffer(buffer: ArrayBuffer, mixToMono: boolean): AudioBuffer;
    decodeAudioData(audioData: ArrayBuffer,  successCallback: any, errorCallback?: any): void;
    createBufferSource(): AudioBufferSourceNode;
    createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
    createMediaStreamSource(mediaStream: any): MediaStreamAudioSourceNode;
    createScriptProcessor(bufferSize: number, numberOfInputChannels?: number, numberOfOutputChannels?: number):  ScriptProcessorNode;
    createAnalyser(): AnalyserNode;
    createGain(): GainNode;
    createDelay(maxDelayTime?: number): DelayNode;
    createBiquadFilter(): BiquadFilterNode;
    createWaveShaper(): WaveShaperNode;
    createPanner(): PannerNode;
    createConvolver(): ConvolverNode;
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode;
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode;
    createDynamicsCompressor(): DynamicsCompressorNode;
    createOscillator(): OscillatorNode;
    createWaveTable(real: any,imag: any): WaveTable;
    resume(): void;
    suspend(): void;
}

interface OfflineRenderSuccessCallback {
    (renderedData: AudioBuffer): void;
}

interface OfflineAudioContext extends AudioContext{
    startRendering(): void;
}

declare var webkitOfflineAudioContext: {
    new (numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext;
} 

interface AudioNode {
    connect(destination: AudioNode, output?: number, input?: number): void;
    connect(destination: AudioParam, output?: number): void;
    disconnect(output?: number): void;
}

interface AudioSourceNode extends AudioNode {
}

interface AudioDestinationNode extends AudioNode {
    maxNumberOfChannels: number;
    numberOfChannels: number;
}

interface AudioParam {
    minValue: number;
    maxValue: number;
    setValueAtTime(value: number, startTime: number): void;
    linearRampToValueAtTime(value: number, time: number): void;
    exponentialRampToValueAtTime(value: number, endTime: number): void;
    setTargetValueAtTime(target: number, startTime: number, timeConstant: number): void;
    setValueCurveAtTime(values: Float32Array, time: number, duration: number): void;
    cancelScheduledValues(startTime: number): void;
}

interface GainNode extends AudioNode {
}

interface DelayNode extends AudioNode {
}

interface AudioBuffer {
    getChannelData(channel: number): Float32Array;
}

interface AudioBufferSourceNode extends AudioSourceNode {
    start(when: number, offset?: number, duration?: number): void;
    stop(when: number): void;
}

interface MediaElementAudioSourceNode extends AudioSourceNode {
}

interface ScriptProcessorNode  extends AudioNode {
}

interface AudioProcessingEvent extends Event {
    node: ScriptProcessorNode;
}

declare enum PanningModelType {
    equalpower,
    HRTF,
    soundfield
}

declare enum DistanceModelType {
    linear,
    inverse,
    exponential
}

interface PannerNode extends AudioNode {
    setPosition(x: number, y: number, z: number): void;
    setOrientation(x: number, y: number, z: number): void;
    setVelocity(x: number, y: number, z: number): void;
}

interface AudioListener {
    setPosition(x: number, y: number, z: number): void;
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    setVelocity(x: number, y: number, z: number): void;
}
 
interface ConvolverNode extends AudioNode {
}

interface AnalyserNode extends AudioNode {
    getFloatFrequencyData(array: any): void;
    getByteFrequencyData(array: any): void;
    getByteTimeDomainData(array: any): void;
}

interface ChannelSplitterNode extends AudioNode {
}

interface ChannelMergerNode extends AudioNode {
}

interface DynamicsCompressorNode extends AudioNode {
}

declare enum BiquadFilterType {
    lowpass,
    highpass,
    bandpass,
    lowshelf,
    highshelf,
    peaking,
    notch,
    allpass
}

interface BiquadFilterNode extends AudioNode {
    getFrequencyResponse(frequencyHz: any, magResponse: any, phaseResponse: any): void;
}

interface WaveShaperNode extends AudioNode {
}

declare enum OscillatorType {
    sine,
    square,
    sawtooth,
    triangle,
    custom
}

interface OscillatorNode extends AudioSourceNode {
    playbackState: number;
    start(when: number): void;
    stop(when: number): void;
    setWaveTable(waveTable: WaveTable): void;
}

interface WaveTable {
}

interface MediaStreamAudioSourceNode extends AudioSourceNode {
}

interface MediaStream {
    id: string;
    active: boolean;
}

interface MediaStreamAudioDestinationNode extends AudioNode {
    stream: MediaStream;
}