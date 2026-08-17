/**
 * @license
 * Copyright 2026 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

// Self-hosted addition (build-patches/common/0003-terminal-panel): a sider
// entry that opens an in-app terminal panel. The panel embeds the ttyd sidecar
// served at /ttyd/ by the patched static-server — credentials are injected
// server-side, the browser never sees them. ttyd spawns tmux (`new -A -s main`),
// so the shell survives disconnects, drawer closes and page reloads. The drawer
// uses Arco's stock header (title + X); closing only hides — the session lives
// in tmux server-side. Not an upstream component; the label is intentionally
// hardcoded (no i18n keys) to keep the patch conflict-free.

import React, { useState } from 'react';
import { Drawer, Tooltip } from '@arco-design/web-react';
import { Terminal } from '@icon-park/react';
import classNames from 'classnames';
import type { SiderTooltipProps } from '@renderer/utils/ui/siderTooltip';

type TerminalPanelProps = {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
};

/** Right-side drawer hosting the ttyd terminal. Closing (X / ESC / mask) only
 * hides the iframe (Arco keeps children mounted) and the shell lives in tmux
 * server-side anyway — close/reopen/backgrounding never lose the session. */
const TerminalPanel: React.FC<TerminalPanelProps> = ({ open, onClose, isMobile }) => (
  <Drawer
    title='终端'
    visible={open}
    onCancel={onClose}
    placement='right'
    width={isMobile ? '100%' : 920}
    footer={null}
    bodyStyle={{ padding: 0 }}
  >
    <iframe
      src='/ttyd/'
      title='terminal'
      className='w-full h-full border-none bg-black'
      allow='clipboard-read; clipboard-write'
    />
  </Drawer>
);

type SiderTerminalEntryProps = {
  isMobile: boolean;
  collapsed: boolean;
  siderTooltipProps: SiderTooltipProps;
};

const SiderTerminalEntry: React.FC<SiderTerminalEntryProps> = ({ isMobile, collapsed, siderTooltipProps }) => {
  const [open, setOpen] = useState(false);
  const icon = (
    <Terminal theme='outline' size='20' fill='currentColor' className='block leading-none shrink-0' style={{ lineHeight: 0 }} />
  );

  if (collapsed) {
    return (
      <>
        <Tooltip {...siderTooltipProps} content='终端' position='right'>
          <div
            className={classNames(
              'w-full h-34px flex items-center justify-center cursor-pointer transition-colors rd-8px text-t-primary',
              'hover:bg-fill-3 active:bg-fill-4'
            )}
            onClick={() => setOpen(true)}
          >
            {icon}
          </div>
        </Tooltip>
        <TerminalPanel open={open} onClose={() => setOpen(false)} isMobile={isMobile} />
      </>
    );
  }

  return (
    <>
      <Tooltip {...siderTooltipProps} content='终端' position='right'>
        <div
          className={classNames(
            'box-border group h-34px w-full flex items-center justify-start gap-8px pl-10px pr-8px rd-0.5rem cursor-pointer shrink-0 transition-all text-t-primary',
            isMobile && 'sider-action-btn-mobile',
            'hover:bg-fill-3 active:bg-fill-4'
          )}
          onClick={() => setOpen(true)}
        >
          <span className='size-22px flex items-center justify-center shrink-0 text-t-primary'>
            <Terminal theme='outline' size='16' fill='currentColor' className='block leading-none' style={{ lineHeight: 0 }} />
          </span>
          <span className='collapsed-hidden text-t-primary text-14px font-[500] leading-24px'>终端</span>
        </div>
      </Tooltip>
      <TerminalPanel open={open} onClose={() => setOpen(false)} isMobile={isMobile} />
    </>
  );
};

export default SiderTerminalEntry;
