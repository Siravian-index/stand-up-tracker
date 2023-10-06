
"use client"

import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto, IconSettings } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';

const Navbar = () => {

  const handleSignOut = async () => {
    const rootPage = "/"
    try {
      await signOut({
        callbackUrl: rootPage
      })
    } catch (error) {
      console.error("Failed logging out")
    }
  }

  return (
    <nav>
      {/* TODO add navbar */}
      <Link href="/home/daily">
        <ActionIcon variant="filled" color="gray" size="sm" aria-label="Settings">
          <IconPhoto style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <Link href="/home/settings">
        <ActionIcon variant="filled" color="gray" size="sm" aria-label="Settings">
          <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <ActionIcon variant="filled" color="gray" size="sm" aria-label="Settings" onClick={handleSignOut}>
        <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </nav>
  )
}

export default Navbar