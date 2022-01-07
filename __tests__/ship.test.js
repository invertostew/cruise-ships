'use strict';

const Ship = require('../src/ship.js');

let titanicConfig, balticExplorerConfig, titanic, balticExplorer;
beforeEach(() => {
    titanicConfig = {
        itinerary: {
            ports: [
                {
                    name: 'Southampton',
                    _ships: []
                },
                {
                    name: 'Cherbourg',
                    _ships: []
                },
                {
                    name: 'Queenstown',
                    _ships: []
                },
                {
                    name: 'New York City',
                    _ships: []
                }
            ]
        }
    };
    balticExplorerConfig = {
        itinerary: {
            ports: [
                {
                    name: 'Southampton',
                    _ships: []
                },
                {
                    name: 'Hamburg',
                    _ships: []
                },
                {
                    name: 'Copenhagen',
                    _ships: []
                },
                {
                    name: 'Visby',
                    _ships: []
                },
                {
                    name: 'Helsinki',
                    _ships: []
                },
                {
                    name: 'St Petersburg',
                    _ships: []
                },
                {
                    name: 'Tallinn',
                    _ships: []
                },
                {
                    name: 'Kiel',
                    _ships: []
                },
                {
                    name: 'Skagen',
                    _ships: []
                },
                {
                    name: 'Southampton',
                    _ships: []
                }
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
        test('Ship instances have own "_initialized" property', () => {
            expect(titanic._initialized).toBeFalsy();
            expect(balticExplorer._initialized).toBeFalsy();
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
    describe('init', () => {
        test('Throws an error if "_initialized" is true', () => {
            titanic._initialized = true;
            expect(() => titanic.init()).toThrowError('No need to initialize again.');
        });
        test('init is called on Ship instantiation', () => {
            // titanic._initialized = false;
            // titanic.init = function () {
            //     this._initialized = true;
            // }
            // titanic.itinerary.ports.forEach(port => {
            //     port.addShip = jest.fn;
            // });
            // expect(titanic._currentPort.addShip()).toHaveBeenCalled();
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
                    {
                        name: 'Cherbourg',
                        _ships: []
                    },
                    {
                        name: 'Queenstown',
                        _ships: []
                    },
                    {
                        name: 'New York City',
                        _ships: []
                    }
                ]
            });
        });
        test('State of "_alreadyDocked" should change', () => {
            expect(titanic._alreadyDocked).toEqual([]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                {
                    name: 'Southampton',
                    _ships: []
                }
            ]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                {
                    name: 'Southampton',
                    _ships: []
                },
                {
                    name: 'Cherbourg',
                    _ships: []
                }
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
