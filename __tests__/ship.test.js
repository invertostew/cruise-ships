'use strict';

const Ship = require('../src/ship.js');

describe('Ship', () => {
    describe('constructor', () => {
        let balticExplorerConfig;
        let balticExplorer;
        beforeEach(() => {
            balticExplorerConfig = {
                _itinerary: {
                    ports: [{
                        name: 'Helsinki',
                        _ships: [],
                        addShip: jest.fn()
                    }]
                }
            };
            balticExplorer = new Ship(balticExplorerConfig);
        });

        test('Ship can be instantiated', () => {
            expect(balticExplorer).toBeInstanceOf(Ship);
        });

        test('Ship instance has own "_isInitialized" property', () => {
            expect(balticExplorer).toHaveProperty('_isInitialized');
        });

        test('Ship instance has own "_itinerary" property', () => {
            expect(balticExplorer).toHaveProperty('_itinerary');
        });

        test('Ship instance has own "_currentPort" property', () => {
            expect(balticExplorer).toHaveProperty('_currentPort');
        });

        test('Ship instance has own "_previouslyDockedPorts" property', () => {
            expect(balticExplorer).toHaveProperty('_previouslyDockedPorts');
        });

        xtest('_init is called on Ship instantiation', () => {
            Ship.prototype._init = jest.fn();
            const balticExplorer = new Ship(balticExplorerConfig);

            expect(balticExplorer._init).toHaveBeenCalled();
        });
    });

    describe('_init', () => {
        let balticExplorerConfig;
        let balticExplorer;
        beforeEach(() => {
            balticExplorerConfig = {
                _itinerary: {
                    ports: [{
                        name: 'Helsinki',
                        _ships: [],
                        addShip: jest.fn()
                    }]
                }
            };
            balticExplorer = new Ship(balticExplorerConfig);

            /*
                have to reset the values, otherwise the error will always
                throw because _init is invoked on instantiation.
            */
            balticExplorer._isInitialized = false;
            balticExplorer._currentPort = null;
            balticExplorer._init();
        });

        test('Throws an error if "_isInitialized" is already true', () => {
            const error = 'The ship has already been initialized.';

            expect(() => {
                balticExplorer._init();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should NOT be null after _init', () => {
            expect(balticExplorer._currentPort).not.toBeNull();
        });

        test('addShip should be called when instance is instantiatied', () => {
            expect(balticExplorer._currentPort.addShip).toBeCalledWith(balticExplorer);
        });

        test('State of "_isInitialized" should be true after _init', () => {
            expect(balticExplorer._isInitialized).toBe(true);
        });

        test('State of "_currentPort" should be null if "_itinerary.ports" is empty', () => {
            const emptyConfig = {
                _itinerary: {
                    ports: []
                }
            };
            const balticExplorer = new Ship(emptyConfig);
            
            expect(balticExplorer._currentPort).toBeNull();
        });

        test('State of "_isInitialized" should be false if "_itinerary.ports" is empty', () => {
            const emptyConfig = {
                _itinerary: {
                    ports: []
                }
            };
            const balticExplorer = new Ship(emptyConfig);

            expect(balticExplorer._isInitialized).toBe(false);
        });
    });

    describe('_setSail', () => {
        let balticExplorerConfig;
        let balticExplorer;
        beforeEach(() => {
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
                        }
                    ]
                }
            };
            balticExplorer = new Ship(balticExplorerConfig);
        });

        test('Throws an error if "_itinerary.ports" is empty', () => {
            const error = 'The ship has no itinerary.';

            balticExplorer._itinerary.ports = [];
            expect(() => {
                balticExplorer._setSail();
            }).toThrowError(error);
        });

        test('Throws an error if "_currentPort" is null', () => {
            const error = 'The ship has already set sail.';

            balticExplorer._currentPort = null;
            expect(() => {
                balticExplorer._setSail();
            }).toThrowError(error);
        });

        test('Throws an error if "_itinerary.ports" has one port AND "_previouslyDockedPorts" is not empty', () => {
            const error = 'The ship has already set sail.';

            balticExplorer._itinerary.ports = [jest.fn()];
            balticExplorer._previouslyDockedPorts.push(jest.fn());
            expect(() => {
                balticExplorer._setSail();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should be set to null', () => {
            expect(balticExplorer._currentPort).not.toBeNull();
            balticExplorer._setSail();
            expect(balticExplorer._currentPort).toBeNull();
        });

        test('Remove one port from "_itinerary.ports"', () => {
            expect(balticExplorer._itinerary.ports.length).toBe(2);
            expect(balticExplorer._itinerary.ports[0].name).toBe('Helsinki');
            expect(balticExplorer._itinerary.ports[1].name).toBe('St Petersburg');
            balticExplorer._setSail();
            expect(balticExplorer._itinerary.ports.length).toBe(1);
            expect(balticExplorer._itinerary.ports[0].name).toBe('St Petersburg');
        });

        test('removeShip should be called when _setSail is invoked', () => {
            balticExplorer._setSail();
            const [departedPort] = balticExplorer._previouslyDockedPorts;
            expect(departedPort.removeShip).toHaveBeenCalledWith(balticExplorer);
        });

        test('Add the removed port from "_itinerary.ports" to "_previouslyDockedPorts"', () => {
            expect(balticExplorer._previouslyDockedPorts.length).toBe(0);
            expect(balticExplorer._previouslyDockedPorts).toEqual([]);
            balticExplorer._setSail();
            expect(balticExplorer._previouslyDockedPorts.length).toBe(1);
            expect(balticExplorer._previouslyDockedPorts[0].name).toEqual('Helsinki');
        });

        test('Returns a success message', () => {
            expect(balticExplorer._setSail()).toEqual(
                `The ship has set sail! Next stop: ${balticExplorer._itinerary.ports[0].name}.`
            );
        });
    });

    describe('_dock', () => {
        let balticExplorerConfig;
        let balticExplorer;
        beforeEach(() => {
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
                        }
                    ]
                }
            };
            balticExplorer = new Ship(balticExplorerConfig);

            /*
                ensure _previouslyDockedPorts is not empty otherwise
                the error will always throw.
            */
            balticExplorer._previouslyDockedPorts = [jest.fn()];
        });

        test('Throws an error if "_previouslyDockedPorts" is empty', () => {
            const error = 'You must set sail before you can dock.';

            balticExplorer._previouslyDockedPorts = [];
            expect(() => {
                balticExplorer._dock();
            }).toThrowError(error);
        });

        test('State of "_currentPort" should NOT be null once docked', () => {
            balticExplorer._dock();
            expect(balticExplorer._currentPort).not.toBeNull();
        });

        test('addShip should be called when _dock is invoked', () => {
            balticExplorer._dock();
            expect(balticExplorer._currentPort.addShip).toHaveBeenCalledWith(balticExplorer);
        });

        test('Returns a success message', () => {
            expect(balticExplorer._dock()).toEqual(
                `The ship has docked at ${balticExplorer._itinerary.ports[0].name}.`
            );
        });
    });
});
