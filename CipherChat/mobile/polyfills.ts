import 'react-native-get-random-values';
import { Buffer } from 'buffer';
import process from 'process';

global.Buffer = Buffer;
global.process = process;

if (typeof window !== 'undefined') {
    window.onerror = function (message, source, lineno, colno, error) {
        alert('Global Error: ' + message);
    };
    console.log("Polyfills loaded");
}
