// for intro_A
//1
osc(10, 0, 21).modulate(noise(()=>(cc[0])*30,.1)).kaleid(4).rotate(0,0.02).pixelate(8,2).out(o0)

//2
osc(20, 0, 0).color(0, 1, 2).rotate(0).out(o1)
osc(30, 0, 0).color(2, 0.7, 3).modulate(o1, 0).
add(o1,1).modulate(noise(()=>cc[0]*3+1)).modulatePixelate(o1,1,4).out(o0)


// for intro_B
//1
osc(22, 0.05, 0.8).pixelate(10, 10).kaleid(10).modulate(noise(()=>cc[0]*2+1)).out()

//2
osc(20, 0.03, 1.7).kaleid().mult(osc(20, 0.000, 0).rotate(()=>cc[0])).
blend(o0, 0.9).modulateScale(osc(10, 0),-0.2).
scale(0.8, () => (1.05 + 0.1 * Math.sin(0.05*time))).out(o0)


// for main_A
// 1
solid(0.2,0.6,0.9).layer(osc(31.4,0).thresh(0.8).luma().
modulate(osc(4,1).rotate(0.1),0.02).color(1,0.4,2)).
layer(osc(31.4,0).thresh(()=>(cc[0])).luma().modulate(osc(4,1).
rotate(1),0.01)).out()

//2
osc(20).
modulate(noise(()=>cc[0]+1)).
thresh(()=>(cc[0]),0.1).
color([1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]).
colorama([0.005,0.4,0.6,0.8].
fast(0.25)).
out(o0)

//3
osc(20).
rotate(1,2).
layer(osc(20,0,1).luma(()=>cc[2],0.01)).
modulate(noise(()=>cc[0]+1)).
thresh(()=>(cc[0]),0.1).
color([1,1,1,1]).
colorama([0.005,0.4,0.6,0.8].
fast(0.25)).
out(o0)


// for main_B
//1
gradient(1).mask(voronoi(),10,10).modulate(noise(()=>(cc[0])*3,.01)).thresh(()=>(cc[0]),1).out(o0)

//2
src(o0).modulate(noise(()=>(cc[0])*30,.05)).thresh(()=>(cc[0]),1).blend(shape(5),0.7).out(o0)

//3
src(o0).modulate(noise(()=>(cc[0])*30,1)).thresh(()=>(cc[0]),1).blend(shape(100),0.7).out(o0)


// for tran_A
solid().out()


//for main_C
//1
osc(13,0,1).kaleid(10).mask(shape(4,0.3,1)).modulateRotate(shape(4,0.1,1)).modulateRotate(shape(4,0.1,0.9)).modulateRotate(shape(4,0.1,0.8)).scale(0.6).add(shape(4,0.2,1).color(0.3,1,1,0.5)).rotate(()=>cc[0]).out(o0)

//2
osc(13,0,1).kaleid(10).mask(shape(4,0.3,1)).modulateRotate(shape(4,0.1,1)).modulateRotate(shape(4,0.1,0.9)).modulateRotate(shape(4,0.1,0.8)).scale(0.6).add(shape(4,0.2,1).color(2,1.1,0.2)).rotate(()=>cc[0]).out(o1)

//3
osc(13,0,1).kaleid(10).mask(shape(4,0.3,1)).modulateRotate(shape(4,0.1,1)).modulateRotate(shape(4,0.1,0.9)).modulateRotate(shape(4,0.1,0.8)).scale(0.6).add(shape(4,0.2,1).color(1,0.4,0.2)).rotate(()=>cc[0]).out(o2)

//4
osc(13,0,1).kaleid(10).mask(shape(4,0.3,1)).modulateRotate(shape(4,0.1,1)).modulateRotate(shape(4,0.1,0.9)).modulateRotate(shape(4,0.1,0.8)).scale(0.6).add(shape(4,0.2,1).color(2,0.4,1)).rotate(()=>cc[0]).out(o3)

render()


navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

//create an array to hold our cc values and init to a normalized value
var cc=Array(128).fill(0.5)

getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data
    var index = arr[1]
    //console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
    var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
    cc[index]=val
}

