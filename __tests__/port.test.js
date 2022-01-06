'use strict';

const Port = require('../src/port.js');

let southamptonConfig, southampton;
beforeEach(() => {
    southamptonConfig = {
        name: 'Southampton',
        _ships: []
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
        test('Port instances have own "_ships" property', () => {
            expect(southampton._ships).toEqual([]);
        });
    });
    describe('addShip', () => {
        test('State of "_ships" should change depending on docked ships', () => {
            const titanic = jest.fn();
            const balticExplorer = jest.fn();

            southampton.addShip(titanic);
            expect(southampton._ships).toEqual([titanic]);
            southampton.addShip(balticExplorer);
            expect(southampton._ships).toEqual([titanic, balticExplorer]);
        });
    });
    describe('removeShip', () => {
        test('State of "_ships" should change depending on docked ships', () => {
            const titanic = jest.fn();
            const balticExplorer = jest.fn();

            southampton._ships = [titanic, balticExplorer];
            southampton.removeShip(titanic);
            expect(southampton._ships).toEqual([balticExplorer]);
        });
    });
});
