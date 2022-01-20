(function exportController() {
    class Controller {
        constructor(ship) {
            this.ship = ship;
            this.initialiseSea();

            document.querySelector('#sailbutton').addEventListener('click', () => {
                this.setSail();
            });
        }
    
        initialiseSea() {
            const backgrounds = [
                './images/water0.png',
                './images/water1.png'
            ];
            let backgroundIndex = 0;
    
            window.setInterval(() => {
                document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
                backgroundIndex += 1;
            }, 1000);
        }

        renderPorts(ports) {
            const portsEl = document.querySelector('#ports');
            portsEl.style.width = '0px';

            ports.forEach((port, index) => {
                const newPortEl = document.createElement('div');
                newPortEl.className = 'port';
                newPortEl.dataset.portName = port.name;
                newPortEl.dataset.portIndex = index;
                const portsElWidth = parseInt(portsEl.style.width, 10);
                portsEl.style.width = `${portsElWidth + 256}px`;

                portsEl.appendChild(newPortEl);
            });
        }

        renderShip() {
            const shipPortIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort);
            const portEl = document.querySelector(`[data-port-index='${shipPortIndex}']`);
            const shipEl = document.querySelector('#ship');
            shipEl.style.top = `${portEl.offsetTop + 32}px`;
            shipEl.style.left = `${portEl.offsetLeft - 32}px`;
        }

        setSail() {
            const ship = this.ship

            const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const nextPortIndex = currentPortIndex + 1;
            const nextPortEl = document.querySelector(`[data-port-index='${nextPortIndex}']`);
            const shipElement = document.querySelector('#ship');
            const sailInterval = setInterval(() => {
                const shipLeft = parseInt(shipElement.style.left, 10);

                if (shipLeft === (nextPortEl.offsetLeft - 32)) {
                    ship.setSail();
                    ship.dock();
                    clearInterval(sailInterval);
                }

                shipElement.style.left = `${shipLeft + 1}px`;
            }, 20);

            if (!nextPortEl) {
                return alert('End of the line!');
            }
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
