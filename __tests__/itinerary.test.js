'use strict';

const Itinerary = require('../src/itinerary.js');

describe('Itinerary', () => {
    let itineraryConfig;
    let itinerary;
    beforeEach(() => {
        itineraryConfig = {
            ports: [
                {
                    name: jest.fn()
                }
            ]
        };
        itinerary = new Itinerary(itineraryConfig);
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
