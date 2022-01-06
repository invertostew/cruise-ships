'use strict';

const Port = require('../src/port.js');

let southamptonConfig, southampton;
beforeEach(() => {
    southamptonConfig = {
        name: 'Southampton'
    };
    southampton = new Port(southamptonConfig);
});

describe('Port', () => {
    describe('constructor', () => {
        test('Port can be instantiated', () => {
            expect(southampton).toBeInstanceOf(Port);
        });
        test('Port instances have own "name" property', () => {
            const { name } = southampton;
            expect(southampton.name).toBe(name);
        });
    });
});
