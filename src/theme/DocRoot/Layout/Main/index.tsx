/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/DocRoot/Layout/Main';

import styles from './styles.module.css';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}>
      <div
        className={clsx(
          'container sm:px-4 md:px-0 wiki-article-content mt-8 padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}>
        {children}
      </div>
    </main>
  );
}
