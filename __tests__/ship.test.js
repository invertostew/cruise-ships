'use strict';

const Ship = require('../src/ship.js');

describe('Ship', () => {
    let titanicConfig;
    let balticExplorerConfig;
    let titanic;
    let balticExplorer;
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

    describe('constructor', () => {
        test('Ship can be instantiated', () => {
            expect(titanic).toBeInstanceOf(Ship);
            expect(balticExplorer).toBeInstanceOf(Ship);
        });

        test('Ship instance has own "_isInitialized" property', () => {
            expect(titanic).toHaveProperty('_isInitialized');
            expect(balticExplorer).toHaveProperty('_isInitialized');
        });

        test('Ship instance has own "_itinerary" property', () => {
            expect(titanic).toHaveProperty('_itinerary');
            expect(balticExplorer).toHaveProperty('_itinerary');
        });

        test('Ship instance has own "_currentPort" property', () => {
            expect(titanic).toHaveProperty('_currentPort');
            expect(balticExplorer).toHaveProperty('_currentPort');
        });

        test('Ship instance has own "_previouslyDockedPorts" property', () => {
            expect(titanic).toHaveProperty('_previouslyDockedPorts');
            expect(balticExplorer).toHaveProperty('_previouslyDockedPorts');
        });

        test('_init is called on Ship instantiation', () => {
            expect(titanic._isInitialized).toBe(true);
            expect(balticExplorer._isInitialized).toBe(true);
        });
    });

    describe('_init', () => {
        beforeEach(() => {
            titanic._isInitialized = false;
            titanic._currentPort = null;
            titanic._init();
        });

        test('Throws an error if "_isInitialized" is already true', () => {
            const error = 'The ship has already been initialized.';

            titanic._isInitialized = true;
            expect(() => {
                titanic._init();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should NOT be null after _init', () => {
            expect(titanic._currentPort).not.toBeNull();
        });

        test('addShip() should be called when instance is instantiatied', () => {
            expect(titanic._currentPort.addShip).toBeCalledWith(titanic);
        });

        test('State of "_isInitialized" should be true after _init', () => {
            expect(titanic._isInitialized).toBe(true);
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

        test('Throws an error if "_currentPort" is null', () => {
            const error = 'The ship has already set sail.';

            titanic._currentPort = null;
            expect(() => {
                titanic._setSail();
            }).toThrowError(error);
        });

        test('Throws an error if "_itinerary.ports" has one item, and "_previouslyDockedPorts" is not empty', () => {
            const error = 'The ship has already set sail.';

            titanic._itinerary.ports = [];
            titanic._itinerary.ports.push(jest.fn());
            titanic._previouslyDockedPorts.push(jest.fn());
            expect(() => {
                titanic._setSail();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should be set to null', () => {
            expect(titanic._currentPort).not.toBeNull();
            titanic._setSail();
            expect(titanic._currentPort).toBeNull();
        });

        // look at this again... serialization error when testing array value with toEqual (caused by jest.fn)
        test('State of "_itinerary" should change, the array removes one element each time', () => {
            expect(titanic._itinerary.ports.length).toBe(4);
            titanic._setSail();
            expect(titanic._itinerary.ports.length).toBe(3);
        });

        test('removeShip() should be invoked from within _setSail()', () => {
            titanic._setSail();
            const titanicDepartedPort = titanic._previouslyDockedPorts[0];
            expect(titanicDepartedPort.removeShip).toHaveBeenCalledWith(titanic);

            balticExplorer._setSail();
            const balticDepartedPort = balticExplorer._previouslyDockedPorts[0];
            expect(balticDepartedPort.removeShip).toHaveBeenCalledWith(balticExplorer);
        });

        // look at this again... serialization error when testing array value with toEqual (caused by jest.fn)
        test('State of "_previouslyDockedPorts" should change, the array adds one element each time', () => {
            expect(titanic._previouslyDockedPorts.length).toBe(0);
            titanic._setSail();
            expect(titanic._previouslyDockedPorts.length).toBe(1);
        });

        test('Returns a success message', () => {
            expect(titanic._setSail()).toEqual(
                `The ship has set sail! Next stop: ${titanic._itinerary.ports[0].name}.`
            );
        });
    });

    describe('_dock', () => {
        beforeEach(() => {
            titanic._previouslyDockedPorts = [jest.fn()];
            balticExplorer._previouslyDockedPorts = [jest.fn()];
        });

        test('Throws an error if "_previouslyDockedPorts" is empty', () => {
            const error = 'You must set sail before you can dock.';

            titanic._previouslyDockedPorts = [];
            expect(() => {
                titanic._dock();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should NOT be null once docked', () => {
            titanic._dock();
            expect(titanic._currentPort).not.toBeNull();
        });

        test('addShip() should be invoked from within _dock()', () => {
            titanic._dock();
            expect(titanic._currentPort.addShip).toHaveBeenCalledWith(titanic);

            balticExplorer._dock();
            expect(balticExplorer._currentPort.addShip).toHaveBeenCalledWith(balticExplorer);
        });

        test('Returns a success message', () => {
            expect(titanic._dock()).toEqual(
                `The ship has docked at ${titanic._itinerary.ports[0].name}.`
            );
        });
    });
});
