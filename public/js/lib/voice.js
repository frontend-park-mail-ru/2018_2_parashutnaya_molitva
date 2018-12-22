const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

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

const voiceRecognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
voiceRecognition.grammars = speechRecognitionList;
voiceRecognition.lang = 'en-US';
voiceRecognition.interimResults = false;
voiceRecognition.maxAlternatives = 1;

export default voiceRecognition;
