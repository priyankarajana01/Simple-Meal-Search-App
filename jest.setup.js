import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// You can add other global Jest setups here, e.g.:
// import '@testing-library/jest-dom'; // if not already handled elsewhere or if you want it global for all test files
