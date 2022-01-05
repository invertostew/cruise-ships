'use strict';

const Ship = require('../src/ship.js');
const Port = require('../src/port.js');
const Itinerary = require('../src/itinerary.js');

let itineraryConfig, itinerary, shipConfig, ship;
beforeEach(() => {
    itineraryConfig = {
        ports: [
            new Port({ name: 'Southampton'}),
            new Port({ name: 'Cherbourg' }),
            new Port({ name: 'Cobh' }),
            new Port({ name: 'New York City' })
        ]
    };
    itinerary = new Itinerary(itineraryConfig);
    shipConfig = {
        itinerary: itinerary
    };
    ship = new Ship(shipConfig);
});

describe('Ship constructor', () => {
    test('Ship can be instantiated', () => {
        expect(ship).toBeInstanceOf(Ship);
    });
    test('Ship instance has own currentPort property', () => {
        const { itinerary } = shipConfig;
        expect(ship.currentPort).toEqual(itinerary.ports[0]);
    });
    test('Ship instance has own itinerary property', () => {
        const { itinerary } = shipConfig;
        expect(ship.itinerary).toEqual(itinerary);
    });
    test('Ship instance has own _alreadyDocked property', () => {
        expect(ship._alreadyDocked).toEqual([]);
    });
});

describe('setSail method', () => {
    test('The currentPort property of the Ship instance gets updated', () => {
        ship.setSail();
        expect(ship.currentPort).toBe(null);
    });
    test('The _alreadyDocked property of the Ship instance gets updated', () => {
        ship.setSail();
        expect(ship._alreadyDocked).toEqual([{ name: 'Southampton' }]);
        ship.setSail();
        expect(ship._alreadyDocked).toEqual([
            { name: 'Southampton' },
            { name: 'Cherbourg' }
        ]);
    });
    test('Return a success message', () => {
        expect(ship.setSail()).toEqual('The ship has set sail.');
    });
});

describe('dock method', () => {
    test('The currentPort property of the Ship instance gets updated', () => {
        ship.setSail();
        ship.dock();
        expect(ship.currentPort).toEqual({ name: 'Cherbourg' });
    });
    test('Return a success message', () => {
        ship.setSail();
        expect(ship.dock()).toEqual('The ship has docked at Cherbourg.');
    });
});
