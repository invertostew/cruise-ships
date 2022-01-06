'use strict';

const Itinerary = require('../src/itinerary.js');

let itineraryConfig, itinerary;
beforeEach(() => {
    itineraryConfig = {
        ports: [
            { name: 'Cherbourg' },
            { name: 'Cobh' },
            { name: 'New York City' }
        ]
    };
    itinerary = new Itinerary(itineraryConfig);
});

describe('Itinerary', () => {
    describe('constructor', () => {
        test('Itinerary can be instantiated', () => {
            expect(itinerary).toBeInstanceOf(Itinerary);
        });
        test('Itinerary instances have own "ports" property', () => {
            const { ports } = itinerary;
            expect(itinerary.ports).toEqual(ports);
        });
    });
});
