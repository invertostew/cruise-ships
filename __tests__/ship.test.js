'use strict';

const Ship = require('../src/ship.js');

let titanicConfig, balticExplorerConfig, titanic, balticExplorer;
beforeEach(() => {
    titanicConfig = {
        _itinerary: {
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
        _itinerary: {
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
        test('Ship instances have own "_itinerary" property', () => {
            expect(titanic).toHaveProperty('_itinerary');
            expect(balticExplorer).toHaveProperty('_itinerary');
        });
        test('Ship instances have own "_currentPort" property', () => {
            expect(titanic).toHaveProperty('_currentPort');
            expect(balticExplorer).toHaveProperty('_currentPort');
        });
        test('Ship instances have own "_previouslyDockedPorts" property', () => {
            expect(titanic).toHaveProperty('_previouslyDockedPorts');
            expect(balticExplorer).toHaveProperty('_previouslyDockedPorts');
        });
        test('init is called on Ship instantiation', () => {
            // expect(titanic.init()).toHaveBeenCalled(); // come back to this later...
            expect(titanic._isInitialized).toBe(true);
            expect(balticExplorer._isInitialized).toBe(true);
        });
    });
    describe('init', () => {
        test('Throws an error if "_isInitialized" is already true', () => {
            const error = 'The ship has already been initialized.';

            titanic._isInitialized = true;
            expect(() => {
                titanic._init();
            }).toThrowError(error);
        });
        test('State of "_currentPort" should NOT be null if "_itinerary.ports" is NOT empty', () => {
            expect(titanic._currentPort).not.toBeNull();
        });
        test('addShip should be called when instance is instantiatied', () => {
            expect(titanic._currentPort.addShip).toBeCalledWith(titanic);
        });
        test('State of "_isInitialized" should NOT be false if "_itinerary.ports" is NOT empty', () => {
            expect(titanic._isInitialized).not.toBe(false);
        });
        test('State of "_currentPort" should be null if "_itinerary.ports" is empty', () => {
            const emptyConfig = {
                _itinerary: {
                    ports: []
                }
            };
            const titanic = new Ship(emptyConfig);
            
            expect(titanic._currentPort).toBeNull();
        });
        test('State of "_isInitialized" should be false if "_itinerary.ports" is empty', () => {
            const emptyConfig = {
                _itinerary: {
                    ports: []
                }
            };
            const titanic = new Ship(emptyConfig);

            expect(titanic._isInitialized).toBe(false);
        });
    });
    describe('_setSail', () => {
        test('Throws an error if "_itinerary.ports" is empty', () => {
            const error = 'The ship has no itinerary.';

            titanic._itinerary.ports = [];
            expect(() => {
                titanic._setSail();
            }).toThrowError(error);
        });
        test('State of "_currentPort" should be null', () => {
            titanic._setSail();
            expect(titanic._currentPort).toBeNull();
        });
        xtest('State of "_itinerary" should change', () => {
            titanic._setSail();
            expect(titanic._itinerary).toEqual({
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
        xtest('State of "_previouslyDockedPorts" should change', () => {
            expect(titanic._previouslyDockedPorts).toEqual([]);
            titanic._setSail();
            expect(titanic._previouslyDockedPorts).toEqual([
                {
                    name: 'Southampton',
                    _ships: [],
                    addShip: jest.fn(),
                    removeShip: jest.fn()
                }
            ]);
            titanic._setSail();
            expect(titanic._previouslyDockedPorts).toEqual([
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
            expect(titanic._setSail()).toEqual('The ship has set sail.');
        });
    });
    describe('_dock', () => {
        test('State of "_currentPort" should NOT be null', () => {
            titanic._currentPort = null;
            titanic._dock();
            expect(titanic._currentPort).not.toBeNull();
        });
        test('Returns a success message', () => {
            expect(titanic._dock()).toEqual(`The ship has docked at ${titanic._itinerary.ports[0].name}.`);
        });
    });
});
