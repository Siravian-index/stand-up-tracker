// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto, IconSettings } from '@tabler/icons-react';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {/* TODO add navbar */}
          <>
            <Link href="/dashboard">
              <ActionIcon variant="filled" color="gray" size="sm" aria-label="Settings">
                <IconPhoto style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Link>
            <Link href="/dashboard/settings">
              <ActionIcon variant="filled" color="gray" size="sm" aria-label="Settings">
                <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Link>
          </>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}