# 🍅 Pomodoro CLI Timer

![CS50](https://img.shields.io/badge/CS50x-Final%20Project-red?style=flat-square)
![Node.js](https://img.shields.io/badge/Made%20With-Node.js-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A command-line interface (CLI) tool designed for developers who want to maintain focus and productivity directly from their terminal. It combines the Pomodoro Technique with visual progress bars, native desktop notifications, audio alerts, and automated session logging.

> **Video Demo:** [INSERT YOUR YOUTUBE LINK HERE]

---

## 📸 Screenshots

![Application Running](./screenshots/demo_run.png)
*Figure 1: The timer in action with a visual progress bar and colored status indicators.*

---

## ✨ Features

* **⚡ CLI-First Experience:** No need to leave your terminal or open heavy GUI applications.
* **📊 Visual Progress Bar:** A custom ASCII-based progress bar that updates in real-time without cluttering the console history (uses `process.stdout` and carriage returns).
* **🔔 Native Desktop Notifications:** Sends system-level notifications (macOS/Windows/Linux) when a session ends, ensuring you never miss a break even if the terminal is in the background.
* **🔊 Audio Alerts:** Plays distinct sound cues for "Work Mode" and "Break Mode" to create a Pavlovian focus response.
* **📝 Automated Logging:** Every completed session is automatically saved to a `history.csv` file with timestamps, allowing you to track your productivity over time.
* **🎨 Smart Coloring:** Uses ANSI color codes to visually distinguish between Work (Red), Short Break (Green), and Long Break (Green) states.
* **🔄 Auto-Session Management:** Automatically handles the logic for Short Breaks (5 min) vs. Long Breaks (25 min) based on the standard Pomodoro flow (4 sets = 1 long break).

---

## 🚀 Installation

### Prerequisites
You must have **Node.js** installed on your machine.
* **Download Node.js:** [nodejs.org](https://nodejs.org/)

### Step-by-Step Guide

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/pomodoro-cli.git](https://github.com/YOUR_USERNAME/pomodoro-cli.git)
    cd pomodoro-cli
    ```

2.  **Install Dependencies**
    This project uses `node-notifier` for notifications and `play-sound` for audio. Install them via npm:
    ```bash
    npm install
    ```

3.  **Setup Audio Files**
    Ensure that `mola_vakti.wav` and `is_vakti.wav` are present in the root directory. You can replace these with any `.wav` or `.mp3` files of your choice.

---

## 💻 Usage

To start the application, navigate to the project directory in your terminal.

### The Command
The tool accepts one argument: the number of **sessions** (sets) you want to complete.

```bash
./index.js <number_of_sets>