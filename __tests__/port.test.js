'use strict';

const Port = require('../src/port.js');

describe('Port', () => {
    let southamptonConfig;
    let southampton;
    beforeEach(() => {
        southamptonConfig = {
            name: jest.fn(),
            _ships: []
        };
        southampton = new Port(southamptonConfig);
    });

    describe('constructor', () => {
        test('Port can be instantiated', () => {
            expect(southampton).toBeInstanceOf(Port);
        });

        test('Port instances have own "name" property', () => {
            expect(southampton).toHaveProperty('name');
        });

        test('Port instances have own "_ships" property', () => {
            expect(southampton).toHaveProperty('_ships');
        });
    });

    describe('addShip', () => {
        test('State of "_ships" should change depending on docked ships', () => {
            const ship1 = jest.fn();
            const ship2 = jest.fn();

            southampton.addShip(ship1);
            expect(southampton._ships).toEqual([ship1]);
            southampton.addShip(ship2);
            expect(southampton._ships).toEqual([ship1, ship2]);
        });
    });

    describe('removeShip', () => {
        test('State of "_ships" should change depending on docked ships', () => {
            const ship1 = jest.fn();
            const ship2 = jest.fn();

            southampton._ships = [ship1, ship2];
            southampton.removeShip(ship1);
            expect(southampton._ships).toEqual([ship2]);
        });
    });
});
