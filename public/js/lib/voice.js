const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H'
];

const numbers = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
];

const grammar =
    `#JSGF V1.0; grammar chess.turns;
    public <turn> = <letter><number> <letter><number>;
    <letter> = [${letters.join(' | ')}];
    <number> = [${numbers.join(' | ')}];`;

class VoiceRecognition {
    constructor () {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition || undefined;
        const SpeechGrammarList =
            window.SpeechGrammarList || window.webkitSpeechGrammarList || undefined;

        this._voiceRecognition = SpeechRecognition ? new SpeechRecognition() : undefined;
        const speechRecognitionList = SpeechGrammarList ? new SpeechGrammarList() : undefined;

        if (!this._voiceRecognition || !speechRecognitionList) {
            console.error('No SpeechRecognition');
            return;
        }

        speechRecognitionList.addFromString(grammar, 1);

        this._voiceRecognition.grammars = speechRecognitionList;
        this._voiceRecognition.lang = 'en-US';
        this._voiceRecognition.interimResults = false;
        this._voiceRecognition.maxAlternatives = 1;
    }

    start () {
        if (!this._voiceRecognition) {
            console.error('No SpeechRecognition');
            return;
        }

        this._voiceRecognition.start();
    }

    onResult (fn = () => null) {
        if (!this._voiceRecognition) {
            console.error('No SpeechRecognition');
            return;
        }

        this._voiceRecognition.onresult = fn;
    }
}

const voiceRecognition = new VoiceRecognition();
export default voiceRecognition;
