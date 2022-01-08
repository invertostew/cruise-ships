'use strict';

const Ship = require('../src/ship.js');

let titanicConfig, balticExplorerConfig, titanic, balticExplorer;
beforeEach(() => {
    titanicConfig = {
        itinerary: {
            ports: [
                {
                    name: 'Southampton',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'Cherbourg',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'Queenstown',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'New York City',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                }
            ]
        }
    };
    balticExplorerConfig = {
        itinerary: {
            ports: [
                {
                    name: 'Helsinki',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'St Petersburg',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'Tallinn',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'Kiel',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
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
        test('Ship instances have own "_isInitialized" property', () => {
            expect(titanic).toHaveProperty('_isInitialized');
            expect(balticExplorer).toHaveProperty('_isInitialized');
        });
        test('Ship instances have own "itinerary" property', () => {
            expect(titanic).toHaveProperty('itinerary');
            expect(balticExplorer).toHaveProperty('itinerary');
        });
        test('Ship instances have own "_currentPort" property', () => {
            expect(titanic).toHaveProperty('_currentPort');
            expect(balticExplorer).toHaveProperty('_currentPort');
        });
        test('Ship instances have own "_alreadyDocked" property', () => {
            expect(titanic).toHaveProperty('_alreadyDocked');
            expect(balticExplorer).toHaveProperty('_alreadyDocked');
        });
        test('init is called on Ship instantiation', () => {
            // expect(titanic.init()).toHaveBeenCalled(); // come back to this later...
            expect(titanic._isInitialized).toBe(true);
            expect(balticExplorer._isInitialized).toBe(true);
        });
    });
    describe('init', () => {
        test('Throws an error if "_isInitialized" is already true', () => {
            titanic._isInitialized = true;
            expect(() => {
                titanic.init();
            }).toThrow(new Error('No need to initialize again.'));
        });
        test('State of "_currentPort" should NOT be null if "itinerary.ports" is NOT empty', () => {
            expect(titanic._currentPort).not.toBeNull();
        });
        test('addShip should be called when instance is instantiatied', () => {
            expect(titanic._currentPort.addShip).toBeCalledWith(titanic);
        });
        test('State of "_isInitialized" should NOT be false if "itinerary.ports" is NOT empty', () => {
            expect(titanic._isInitialized).not.toBe(false);
        });
        test('State of "_currentPort" should be null if "itinerary.ports" is empty', () => {
            const emptyConfig = {
                itinerary: {
                    ports: []
                }
            };
            const titanic = new Ship(emptyConfig);
            
            expect(titanic._currentPort).toBeNull();
        });
        test('State of "_isInitialized" should be false if "itinerary.ports" is empty', () => {
            const emptyConfig = {
                itinerary: {
                    ports: []
                }
            };
            const titanic = new Ship(emptyConfig);

            expect(titanic._isInitialized).toBe(false);
        });
    });
    describe('setSail', () => {
        test('Throws an error if "itinerary.ports" is empty', () => {
            titanic.itinerary.ports = [];
            expect(() => {
                titanic.setSail();
            }).toThrow(new Error('The ship has no itinerary.'));
        });
        test('State of "_currentPort" should be null', () => {
            titanic.setSail();
            expect(titanic._currentPort).toBeNull();
        });
        xtest('State of "itinerary" should change', () => {
            titanic.setSail();
            expect(titanic.itinerary).toEqual({
                ports: [
                    {
                        name: 'Cherbourg',
                        _ships: [],
                        addShip: jest.fn(),
                        removeShip: jest.fn()
                    },
                    {
                        name: 'Queenstown',
                        _ships: [],
                        addShip: jest.fn(),
                        removeShip: jest.fn()
                    },
                    {
                        name: 'New York City',
                        _ships: [],
                        addShip: jest.fn(),
                        removeShip: jest.fn()
                    }
                ]
            });
        });
        xtest('State of "_alreadyDocked" should change', () => {
            expect(titanic._alreadyDocked).toEqual([]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                {
                    name: 'Southampton',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                }
            ]);
            titanic.setSail();
            expect(titanic._alreadyDocked).toEqual([
                {
                    name: 'Southampton',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                },
                {
                    name: 'Cherbourg',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
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
