# Changelog

All notable changes to the "Infinite Terminal" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-03-16

### Added
- Status bar button for quick access to Infinite Terminal
- Extension activates on startup for immediate availability
- Icon and LICENSE for VS Code Marketplace packaging

### Fixed
- Removed duplicate `getNonce()` and unused `exec` import

## [0.1.0] - 2026-03-15

### Added
- Infinite canvas with pan, zoom, and grid background
- Real terminal I/O via node-pty with ANSI color rendering
- Terminal cards with drag, resize, rename, and keyboard input
- Terminal search modal (Ctrl+P) with arrow key navigation
- Preset terminal configurations with full manager UI
- Git worktree integration with worktree manager UI
- Connection lines (SVG) between related terminals
- Minimap overlay during canvas/terminal drag
- Layout persistence via VS Code workspace state
- Pixel art office view with animated workers linked to terminal activity
- Fallback to VS Code built-in terminals when node-pty is unavailable
