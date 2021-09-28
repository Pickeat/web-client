// const _onDetected = res => {
//     setBarcode(res.codeResult.code);
// };
import Quagga from 'quagga';

Quagga.onProcessed(result => {
    let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
        if (result.boxes) {
            drawingCtx.clearRect(
                0,
                0,
                parseInt(drawingCanvas.getAttribute('width')),
                parseInt(drawingCanvas.getAttribute('height'))
            );
            result.boxes.filter(box => box !== result.box).forEach(box => {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                    color: 'green',
                    lineWidth: 2
                });
            });
        }

        if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
    }
});

export const startScanner = (_onDetected) => {
    Quagga.init(
        {
            inputStream: {
                type: 'LiveStream',
                target: document.querySelector('#scanner-container'),
                constraints: {
                    facingMode: 'environment' // or user
                }
            },
            numOfWorkers: navigator.hardwareConcurrency,
            locate: true,
            frequency: 1,
            debug: {
                drawBoundingBox: true,
                showFrequency: true,
                drawScanline: true,
                showPattern: true
            },
            multiple: false,
            locator: {
                halfSample: false,
                patchSize: 'large', // x-small, small, medium, large, x-large
                debug: {
                    showCanvas: false,
                    showPatches: false,
                    showFoundPatches: false,
                    showSkeleton: false,
                    showLabels: false,
                    showPatchLabels: false,
                    showRemainingPatchLabels: false,
                    boxFromPatches: {
                        showTransformed: false,
                        showTransformedBox: false,
                        showBB: false
                    }
                }
            },
            decoder: {
                readers: [
                    'code_128_reader',
                    'ean_reader',
                    'ean_8_reader',
                    'code_39_reader',
                    'code_39_vin_reader',
                    'codabar_reader',
                    'upc_reader',
                    'upc_e_reader',
                    'i2of5_reader',
                    'i2of5_reader',
                    '2of5_reader',
                    'code_93_reader'
                ]
            }
        },
        err => {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        }
    );
    Quagga.onDetected(_onDetected);
};

export const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
};