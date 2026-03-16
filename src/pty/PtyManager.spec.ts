import { describe, expect, it, vi } from 'vitest';

import { ensureNodePtySpawnHelperExecutable } from './PtyManager';

describe('PtyManager', () => {
  describe('ensureNodePtySpawnHelperExecutable', () => {
    it('should make spawn-helper executable on Darwin when execute bits are missing', () => {
      const chmodSync = vi.fn();

      ensureNodePtySpawnHelperExecutable({
        arch: 'arm64',
        chmodSync,
        existsSync: vi.fn(() => true),
        hasPty: true,
        platform: 'darwin',
        resolveNodePtyRoot: () => '/tmp/node-pty',
        statSync: vi.fn(() => ({ mode: 0o644 }) as never),
        warn: vi.fn(),
      });

      expect(chmodSync).toHaveBeenCalledWith(
        '/tmp/node-pty/prebuilds/darwin-arm64/spawn-helper',
        0o755,
      );
    });

    it('should skip chmod when the helper is already executable', () => {
      const chmodSync = vi.fn();

      ensureNodePtySpawnHelperExecutable({
        arch: 'arm64',
        chmodSync,
        existsSync: vi.fn(() => true),
        hasPty: true,
        platform: 'darwin',
        resolveNodePtyRoot: () => '/tmp/node-pty',
        statSync: vi.fn(() => ({ mode: 0o755 }) as never),
        warn: vi.fn(),
      });

      expect(chmodSync).not.toHaveBeenCalled();
    });

    it('should skip chmod when the platform is not Darwin', () => {
      const chmodSync = vi.fn();

      ensureNodePtySpawnHelperExecutable({
        chmodSync,
        existsSync: vi.fn(() => true),
        hasPty: true,
        platform: 'linux',
        resolveNodePtyRoot: () => '/tmp/node-pty',
        statSync: vi.fn(() => ({ mode: 0o644 }) as never),
        warn: vi.fn(),
      });

      expect(chmodSync).not.toHaveBeenCalled();
    });
  });
});
