'use strict';

class Shape {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
    }

    set shape(value) {
        this._shape = value;
    }

    get shape() {
        return this._shape;
    }

    set color(value) {
        this._color = value;
    }

    get color() {
        return this._color;
    }

    getInfo() {
        return `${this.color} ${this.shape}`;
    }

}

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const shapeBucket = select('.shape-bucket');
const shapeSelector = select('select[name="shape"');
const colorSelector = select('select[name="color"');
const createShapeBtn = select('input[type="button"]');
const infoBar = select('.info');
const shapesArr = [];
const MAX_BUCKET_SIZE = 28;
const COLORS = {
    "#09f": "Blue",
    "#9f0": "Green",
    "#f90": "Orange",
    "#f09": "Pink",
    "#90f": "Purple"
}

listen('click', createShapeBtn, () => {
    createShape();
});

function isValidateInputs() {
    if (shapeSelector.selectedIndex <= 0) {
        shapeSelector.focus();
        displayError('No shape selected, please select a valid shape');
        return false;
    }

    if (colorSelector.selectedIndex <= 0 ) {
        colorSelector.focus();
        displayError('No color selected, please select a valid color');
        return false;
    }
    return true;
}

function createShape() {
     if (!isValidateInputs()) return;
     if (!isSpaceAvailable()) return;
    let shape = shapeSelector.value;
    let color = COLORS[colorSelector.value].toLowerCase();
    let shapeCounts = shapesArr.length;
    const newShapeObj = new Shape(shape, color);
    const newShape = document.createElement('div');

    shapesArr.push(newShapeObj);

    newShape.className = `shape ${shape}`;
    newShape.style.backgroundColor = colorSelector.value;
    newShape.setAttribute('shape-number', `${shapeCounts + 1}`);
    shapeBucket.appendChild(newShape);

    listen('click', newShape, () => {
        let index = newShape.getAttribute('shape-number');
        infoBar.innerText = `Unit ${index}: ${shapesArr[index - 1].getInfo()}`;
    });
}

function isSpaceAvailable(){
    if (shapesArr.length >= MAX_BUCKET_SIZE) {
        disableCreateBtn();
        displayError('No more space to create a new shape');
        return false;
    }
    return true;
}

function disableCreateBtn() {
    createShapeBtn.disabled = true;
    createShapeBtn.style.cursor = 'not-allowed';
    createShapeBtn.style.backgroundColor = '#777';
}

function displayError(message) {
    infoBar.classList.add('error');
    setTimeout(() => { 
        infoBar.classList.remove('error');
        infoBar.innerText = '';
    }, 5000);
    infoBar.innerText = message;
}
