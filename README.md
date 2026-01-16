# Executor “Draftsman” (Чертежник)

=======================

This project was implemented as part of the **JS Hackathon in Kherson (24-11-2017)**
[https://dataart.ua/events/kherson/pervyi-js-khakaton-proidet-v-khersone/](https://dataart.ua/events/kherson/pervyi-js-khakaton-proidet-v-khersone/)

Contact details of everyone who worked on this project can be found at the bottom.

---

## Task Description and Basic Concepts

*(based on the ideas of A. P. Yershov, author of the original “Executor” concept)*

> *(Why Markdown headers with `#` sometimes don’t work here — I don’t know. In the IDE everything is displayed correctly. If you know the reason, please tell me.)*

The **Draftsman Executor** is designed to draw figures on a coordinate plane.

When specifying points on the plane, unlike standard mathematical notation, the **X and Y coordinates are separated by a comma**.

The Draftsman has a **pen** that can be:

* lifted,
* lowered,
* and moved.

When the pen is **lowered** and moved, it leaves a trace — a line segment from the previous pen position to the new one.
When the pen is **raised**, moving it leaves no trace.

At the initial state, the Draftsman’s pen is always **raised** and positioned at **(0, 0)**.

### Pen Commands

* **Lift pen**
  Lifts the pen.
  If the pen is already lifted, the command is ignored.
  After this command, the pen is guaranteed to be lifted.

* **Lower pen**
  Lowers the pen.
  Regardless of the previous state, after executing this command the pen is ready to draw.

Drawing is performed using two movement commands:

* **Move to point**
* **Move by vector**

---

![attention image](/docs/index.png)

There are almost no comments in the code — and they are not needed.
Everything is clear thanks to **clean and well-thought-out variable naming**.

---

> This project is implemented using **JavaScript**, which handles user interaction.
> The page layout is done using standard **HTML + CSS**.

---

## Installation

---

The easiest way is to download the repository as an archive and extract it.

### Installation steps:

1. Extract the archive.
2. Locate the file `main.html`.
3. Open it in a browser.

---

## File List and Purpose

The project consists of a small number of files organized into folders.

```text
File / Folder Name     | Description
---------------------- | -------------------------------------------
index.html             | Ready-to-use main application file
js                     | JavaScript scripts
styles                 | CSS styles
img                    | Images
README.md              | This documentation file
```

---

## Project Description and Main Features

---

Clicking the image below opens a **YouTube video presentation** of the program.

[![video preview](/docs/index.png)](https://youtu.be/pJX6LmxbX9Q)

In the original Draftsman from the 1980s, commands were typed into a command line.

In this project, input is **simplified and visual**.

### Workflow

1. The first step is to specify the **starting point** for drawing.
2. Choose one of the available commands (descriptions below).
3. Click the **Draw** button to execute the selected algorithm.

### Movement Commands

* **Move to point (x, y)**
  Moves the pen to absolute coordinates `(x, y)`, regardless of its previous position.
  This is an **absolute movement** command.

* **Move by vector (dX, dY)**
  Moves the pen by `dX` to the right and `dY` upward relative to the current position.
  If the current position is `(x, y)`, the new position becomes `(x + dX, y + dY)`.
  This is a **relative movement** command.

The rest is handled automatically based on the chosen algorithm.

**Typical user of this program:** a 6th-grade student.

![attention image](/docs/index.png)

---

## UI Elements and Their Functions

```text
UI Element              | Function
----------------------- | -------------------------------------------------------------------------
LOWER PEN               | Available immediately after page load
MOVE TO POINT           | Draws a line from the first point to the second point
MOVE BY VECTOR          | Adds a displacement relative to the current position
LIFT PEN                | Finishes drawing the figure
X Coordinate             | Starting X coordinate
Y Coordinate             | Starting Y coordinate
To X                    | Target X coordinate
To Y                    | Target Y coordinate
```

---

## Feedback and Credits

---

Please leave suggestions and fixes in the code comments.

* Logic and README: [GitHub – BorschCode](https://github.com/BorschCode)
* Logic implementation: [LinkedIn – Krist Rash](https://www.linkedin.com/in/kristrash/)
* Design and styles: [Email – Olga Makarova](mailto:o.g.makarova2013@gmail.com)
