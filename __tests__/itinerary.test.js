'use strict';

const Itinerary = require('../src/itinerary.js');

describe('Itinerary', () => {
    let itinerary;
    beforeEach(() => {
        itinerary = new Itinerary(jest.fn());
    });

    describe('constructor', () => {
        test('Itinerary can be instantiated', () => {
            expect(itinerary).toBeInstanceOf(Itinerary);
        });

        test('Itinerary instances have own "ports" property', () => {
            expect(itinerary).toHaveProperty('ports');
        });
    });
});
