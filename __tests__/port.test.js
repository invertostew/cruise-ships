'use strict';

const Port = require('../src/port.js');

let config, port;
beforeEach(() => {
    config = {
        name: 'Southampton'
    };
    port = new Port(config);
});

describe('Port constructor', () => {
    test('Port can be instantiated', () => {
        expect(port).toBeInstanceOf(Port);
    });
    test('Port instance has own name property', () => {
        const { name } = config;
        expect(port.name).not.toBeUndefined();
        expect(port.name).toEqual(name);
    });
});