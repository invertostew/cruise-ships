(function exportController() {
    class Controller {
        constructor() {
            this.initialiseSea();
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

        renderShip(ship) {
            const shipPortIndex = ship._itinerary.ports.indexOf(ship._currentPort);
            const portEl = document.querySelector(`[data-port-index='${shipPortIndex}']`);
            const shipEl = document.querySelector('#ship');
            shipEl.style.top = `${portEl.offsetTop + 32}px`;
            shipEl.style.left = `${portEl.offsetLeft - 32}px`;
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
