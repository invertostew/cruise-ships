'use strict';

const Ship = require('../src/ship.js');

let titanicConfig, balticExplorerConfig, titanic, balticExplorer;
beforeEach(() => {
    titanicConfig = {
        itinerary: {
            ports: [
                { name: 'Southampton'},
                { name: 'Cherbourg'},
                { name: 'Queenstown'},
                { name: 'New York City'}
            ]
        }
    };
    balticExplorerConfig = {
        itinerary: {
            ports: [
                { name: 'Southampton'},
                { name: 'Hamburg'},
                { name: 'Copenhagen'},
                { name: 'Visby'},
                { name: 'Helsinki'},
                { name: 'St Petersburg'},
                { name: 'Tallinn'},
                { name: 'Kiel'},
                { name: 'Skagen'},
                { name: 'Southampton'}
            ]
        }
    };
    titanic = new Ship(titanicConfig);
    balticExplorer = new Ship(balticExplorerConfig);
});

describe('Ship', () => {
    describe('constructor', () => {
        test('Ship can be instantiated', () => {
            expect(titanic).toBeInstanceOf(Ship);
            expect(balticExplorer).toBeInstanceOf(Ship);
        });
        test('Ship instances have own "itinerary" property', () => {
            const { itinerary: titanicItinerary } = titanic;
            const { itinerary: balticItinerary } = balticExplorer;

            expect(titanic.itinerary).toEqual(titanicItinerary);
            expect(balticExplorer.itinerary).toEqual(balticItinerary);
        });
        test('Ship instances have own "_currentPort" property', () => {
            const { itinerary: titanicItinerary } = titanic;
            const { itinerary: balticItinerary } = balticExplorer;

            expect(titanic._currentPort).toEqual(titanicItinerary.ports[0]);
            expect(balticExplorer._currentPort).toEqual(balticItinerary.ports[0]);
        });
        test('Ship instances have own "_alreadyDocked" property', () => {
            expect(titanic._alreadyDocked).toEqual([]);
            expect(balticExplorer._alreadyDocked).toEqual([]);
        });
    });
    describe('setSail', () => {
        test('Throws an error if the "itinerary.ports" is empty', () => {
            const emptyConfig = {
                itinerary: {
                    ports: []
                }
            };
            const titanic = new Ship(emptyConfig);
            
            expect(() => titanic.setSail()).toThrowError('The ship has no itinerary.');
        });
        test('State of "_currentPort" should be null', () => {
            titanic.setSail();
            expect(titanic._currentPort).toBeNull();
        });
        test('State of "itinerary" should change', () => {
            titanic.setSail();
            expect(titanic.itinerary).toEqual({
                ports: [
                    { name: 'Cherbourg'},
                    { name: 'Queenstown'},
                    { name: 'New York City'}
                ]
            });
        });
        test('State of "_alreadyDocked" should change', () => {
            expect(titanic._alreadyDocked).toEqual([]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                { name: 'Southampton' }
            ]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                { name: 'Southampton' },
                { name: 'Cherbourg' }
            ]);
        });
        test('Returns a success message', () => {
            expect(titanic.setSail()).toEqual('The ship has set sail.');
        });
    });
    describe('dock', () => {
        test('State of "_currentPort" should NOT be null', () => {
            titanic._currentPort = null;
            titanic.dock();
            expect(titanic._currentPort).not.toBeNull();
        });
        test('Returns a success message', () => {
            expect(titanic.dock()).toEqual(`The ship has docked at ${titanic.itinerary.ports[0].name}.`);
        });
    });
});
