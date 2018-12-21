import AiModel from './aiWorkerModel';

const moveMsg = {
    type: 'move'
};

let aiModel = null;

self.onmessage = function (msg) {
    switch (msg.data.type) {
    case 'start':
        onStart(msg.data.data);
        break;
    case 'move':
        onMove(msg.data.data);
        break;
    default:
        console.log('Unknown msg');
        break;
    }
};

function onMove (data) {
    if (!data || !data.move) {
        console.log('data is undefined');
        return;
    }

    postMessage({ ...moveMsg, data: { move: aiModel.move(data.move) } });
}

function onStart (data) {
    if (!data || !data.mode) {
        console.log('data is undefined');
        return;
    }

    console.log('Start with mode: ' + data.mode);
    aiModel = new AiModel(data.mode);
}
