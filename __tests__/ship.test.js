'use strict';

const Ship = require('../src/ship.js');

let config, ship;
beforeEach(() => {
    config = {
        startingPort: 'Southampton'
    };
    ship = new Ship(config);
});

describe('Ship constructor', () => {
    test('Ship can be instantiated', () => {
        expect(ship).toBeInstanceOf(Ship);
    });
    test('Ship instance has own startingPort property', () => {
        const { startingPort } = config;
        expect(ship.startingPort).not.toBeUndefined();
        expect(ship.startingPort).toEqual(startingPort);
    });
});