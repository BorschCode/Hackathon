const GRID_SIZE = 10;
const CELL_SIZE = 50;
const ORIGIN = { x: 5, y: 5 }; // logical (0,0) in grid center

const gridCanvas = document.getElementById("gridCanvas");
const drawCanvas = document.getElementById("drawCanvas");
const gridCtx = gridCanvas.getContext("2d");
const drawCtx = drawCanvas.getContext("2d");

const logEl = document.getElementById("log");

const pen = {
    isDown: false,
    x: 0,
    y: 0
};

/* ---------- GRID & AXES ---------- */

function drawGrid() {
    gridCtx.clearRect(0, 0, 500, 500);

    for (let i = 0; i <= GRID_SIZE; i++) {
        const pos = i * CELL_SIZE;

        gridCtx.strokeStyle = "#ddd";
        gridCtx.beginPath();
        gridCtx.moveTo(pos, 0);
        gridCtx.lineTo(pos, 500);
        gridCtx.stroke();

        gridCtx.beginPath();
        gridCtx.moveTo(0, pos);
        gridCtx.lineTo(500, pos);
        gridCtx.stroke();
    }

    // X axis
    gridCtx.strokeStyle = "#000";
    gridCtx.beginPath();
    gridCtx.moveTo(0, ORIGIN.y * CELL_SIZE);
    gridCtx.lineTo(500, ORIGIN.y * CELL_SIZE);
    gridCtx.stroke();

    // Y axis
    gridCtx.beginPath();
    gridCtx.moveTo(ORIGIN.x * CELL_SIZE, 0);
    gridCtx.lineTo(ORIGIN.x * CELL_SIZE, 500);
    gridCtx.stroke();
}

function logicalToPixel(x, y) {
    return {
        px: (ORIGIN.x + x) * CELL_SIZE,
        py: (ORIGIN.y - y) * CELL_SIZE
    };
}

/* ---------- DRAWING ---------- */

function moveTo(x, y) {
    const from = logicalToPixel(pen.x, pen.y);
    const to = logicalToPixel(x, y);

    if (pen.isDown) {
        drawCtx.beginPath();
        drawCtx.moveTo(from.px, from.py);
        drawCtx.lineTo(to.px, to.py);
        drawCtx.stroke();
    }

    pen.x = x;
    pen.y = y;
}

function log(text) {
    logEl.innerHTML += `<p>${text}</p>`;
}

/* ---------- CONTROLS ---------- */

document.getElementById("raisePen").onclick = () => {
    pen.isDown = false;
    log("Pen raised");
};

document.getElementById("lowerPen").onclick = () => {
    pen.isDown = true;
    log("Pen lowered");
};

document.getElementById("movePoint").onclick = () => {
    const x = +xInput.value;
    const y = +yInput.value;
    moveTo(x, y);
    log(`Move to (${x}, ${y})`);
};

document.getElementById("moveVector").onclick = () => {
    const dx = +dxInput.value;
    const dy = +dyInput.value;
    moveTo(pen.x + dx, pen.y + dy);
    log(`Move by vector (${dx}, ${dy})`);
};

/* ---------- INIT ---------- */

drawGrid();
