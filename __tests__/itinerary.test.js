'use strict';

const Itinerary = require('../src/itinerary.js');
const Port = require('../src/port.js');

let config, itinerary;
beforeEach(() => {
    config = {
        ports: [
            new Port({ name: 'Cherbourg' }),
            new Port({ name: 'Cobh' }),
            new Port({ name: 'New York City' })
        ]
    };
    itinerary = new Itinerary(config);
});

describe('Itinerary constructor', () => {
    test('Itinerary can be instantiated', () => {
        expect(itinerary).toBeInstanceOf(Itinerary);
    });
    test('Itinerary instance has own ports property', () => {
        const { ports } = config;
        expect(itinerary.ports).not.toBeUndefined();
        expect(itinerary.ports).toEqual(ports);
    });
});
