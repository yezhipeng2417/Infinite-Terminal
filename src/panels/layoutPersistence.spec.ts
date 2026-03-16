import { describe, expect, it } from 'vitest';

import {
  DEFAULT_TERMINAL_HEIGHT,
  DEFAULT_TERMINAL_WIDTH,
  normalizeSavedLayout,
  serializeLayoutState,
} from './layoutPersistence';

describe('layoutPersistence', () => {
  describe('serializeLayoutState', () => {
    it('should preserve command, width, and height when serializing layout', () => {
      const layout = serializeLayoutState(
        [
          {
            id: 'term-1',
            name: 'Node',
            command: 'node',
            cwd: '/workspace',
            x: 120,
            y: 240,
            w: 720,
            h: 480,
            parentId: 'root',
          },
        ],
        32,
        64,
        1.25,
      );

      expect(layout).toEqual({
        terminals: [
          {
            id: 'term-1',
            name: 'Node',
            command: 'node',
            cwd: '/workspace',
            x: 120,
            y: 240,
            w: 720,
            h: 480,
            parentId: 'root',
          },
        ],
        canvasX: 32,
        canvasY: 64,
        zoom: 1.25,
      });
    });
  });

  describe('normalizeSavedLayout', () => {
    it('should restore legacy layouts with default command and dimensions', () => {
      const layout = normalizeSavedLayout({
        terminals: [
          {
            id: 'term-2',
            name: 'Shell',
            cwd: '/legacy',
            x: 8,
            y: 16,
          },
        ],
      });

      expect(layout).toEqual({
        terminals: [
          {
            id: 'term-2',
            name: 'Shell',
            command: '',
            cwd: '/legacy',
            x: 8,
            y: 16,
            w: DEFAULT_TERMINAL_WIDTH,
            h: DEFAULT_TERMINAL_HEIGHT,
            parentId: null,
          },
        ],
        canvasX: 0,
        canvasY: 0,
        zoom: 1,
      });
    });

    it('should preserve parent relationships and viewport values when normalizing', () => {
      const layout = normalizeSavedLayout({
        terminals: [
          {
            id: 'term-3',
            name: 'Child',
            command: 'npm test',
            cwd: '/workspace',
            x: 10,
            y: 20,
            w: 500,
            h: 300,
            parentId: 'term-1',
          },
        ],
        canvasX: -150,
        canvasY: 75,
        zoom: 0.8,
      });

      expect(layout).toEqual({
        terminals: [
          {
            id: 'term-3',
            name: 'Child',
            command: 'npm test',
            cwd: '/workspace',
            x: 10,
            y: 20,
            w: 500,
            h: 300,
            parentId: 'term-1',
          },
        ],
        canvasX: -150,
        canvasY: 75,
        zoom: 0.8,
      });
    });
  });
});
