// Configuration
const GRID_SIZE = 20;
const CELL_SIZE = 30;
const ORIGIN_X = 300;
const ORIGIN_Y = 300;

// State
let canvas, ctx;
let penDown = false;
let currentX = 0;
let currentY = 0;
let commands = [];

// Initialize on page load
window.addEventListener('load', init);
window.addEventListener('resize', updatePenIndicator);

function init() {
    canvas = document.getElementById('main-canvas');
    ctx = canvas.getContext('2d');
    drawGrid();
    updatePenIndicator();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 1;

    // Draw grid lines
    for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
        const pos = ORIGIN_X + i * CELL_SIZE;

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, ORIGIN_Y);
    ctx.lineTo(canvas.width, ORIGIN_Y);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, 0);
    ctx.lineTo(ORIGIN_X, canvas.height);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
        if (i === 0) continue;

        const posX = ORIGIN_X + i * CELL_SIZE;
        const posY = ORIGIN_Y - i * CELL_SIZE;

        // X axis labels
        ctx.fillText(i.toString(), posX, ORIGIN_Y + 15);

        // Y axis labels
        ctx.fillText(i.toString(), ORIGIN_X - 15, posY);
    }

    // Draw origin
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(ORIGIN_X, ORIGIN_Y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('0', ORIGIN_X - 15, ORIGIN_Y + 15);
}

function gridToCanvas(x, y) {
    return {
        x: ORIGIN_X + x * CELL_SIZE,
        y: ORIGIN_Y - y * CELL_SIZE
    };
}

function raisePen() {
    if (!penDown) {
        logCommand('Pen already raised');
        return;
    }
    penDown = false;
    commands.push({ type: 'raise' });
    updateUI();
    logCommand('RAISE PEN');
}

function lowerPen() {
    if (penDown) {
        logCommand('Pen already lowered');
        return;
    }
    penDown = true;
    commands.push({ type: 'lower' });
    updateUI();
    logCommand('LOWER PEN');
}

function moveToPoint() {
    const x = parseInt(document.getElementById('point-x').value);
    const y = parseInt(document.getElementById('point-y').value);

    if (isNaN(x) || isNaN(y)) {
        alert('Please enter valid coordinates');
        return;
    }

    if (Math.abs(x) > GRID_SIZE || Math.abs(y) > GRID_SIZE) {
        alert(`Coordinates must be between -${GRID_SIZE} and ${GRID_SIZE}`);
        return;
    }

    const from = gridToCanvas(currentX, currentY);
    const to = gridToCanvas(x, y);

    if (penDown) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    currentX = x;
    currentY = y;
    commands.push({ type: 'moveToPoint', x, y });
    updateUI();
    logCommand(`MOVE TO POINT (${x}, ${y})`);
}

function moveByVector() {
    const dx = parseInt(document.getElementById('vector-x').value);
    const dy = parseInt(document.getElementById('vector-y').value);

    if (isNaN(dx) || isNaN(dy)) {
        alert('Please enter valid vector components');
        return;
    }

    const newX = currentX + dx;
    const newY = currentY + dy;

    if (Math.abs(newX) > GRID_SIZE || Math.abs(newY) > GRID_SIZE) {
        alert('Movement would exceed grid boundaries');
        return;
    }

    const from = gridToCanvas(currentX, currentY);
    const to = gridToCanvas(newX, newY);

    if (penDown) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    currentX = newX;
    currentY = newY;
    commands.push({ type: 'moveByVector', dx, dy });
    updateUI();
    logCommand(`MOVE BY VECTOR (${dx}, ${dy}) → (${newX}, ${newY})`);
}

function updateUI() {
    const indicator = document.getElementById('pen-indicator');
    const statusDot = document.getElementById('pen-status');
    const penText = document.getElementById('pen-text');
    const posText = document.getElementById('position-text');

    if (penDown) {
        indicator.classList.add('down');
        statusDot.classList.add('active');
        penText.textContent = 'Pen: Lowered';
    } else {
        indicator.classList.remove('down');
        statusDot.classList.remove('active');
        penText.textContent = 'Pen: Raised';
    }

    posText.textContent = `Position: (${currentX}, ${currentY})`;
    updatePenIndicator();
}

function updatePenIndicator() {
    const pos = gridToCanvas(currentX, currentY);
    const indicator = document.getElementById('pen-indicator');
    const rect = canvas.getBoundingClientRect();
    indicator.style.left = (rect.left + pos.x - 6) + 'px';
    indicator.style.top = (rect.top + pos.y - 6) + 'px';
}

function logCommand(text) {
    const log = document.getElementById('command-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function clearCanvas() {
    if (!confirm('Clear all drawings and reset?')) return;

    currentX = 0;
    currentY = 0;
    penDown = false;
    commands = [];
    drawGrid();
    updateUI();
    document.getElementById('command-log').innerHTML = '';
    logCommand('Canvas cleared');
}

function downloadCommands() {
    const data = {
        commands: commands,
        timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'draftsman_commands.json';
    a.click();
    URL.revokeObjectURL(url);
}

function uploadCommands() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                clearCanvas();
                replayCommands(data.commands);
            } catch (err) {
                alert('Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function replayCommands(cmds) {
    cmds.forEach(cmd => {
        if (cmd.type === 'raise') raisePen();
        else if (cmd.type === 'lower') lowerPen();
        else if (cmd.type === 'moveToPoint') {
            document.getElementById('point-x').value = cmd.x;
            document.getElementById('point-y').value = cmd.y;
            moveToPoint();
        } else if (cmd.type === 'moveByVector') {
            document.getElementById('vector-x').value = cmd.dx;
            document.getElementById('vector-y').value = cmd.dy;
            moveByVector();
        }
    });
}