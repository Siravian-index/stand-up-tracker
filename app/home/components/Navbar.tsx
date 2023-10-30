
"use client"

import { ActionIcon, Flex } from '@mantine/core';
import Link from 'next/link';
import { IconLogout, IconPhoto, IconSettings } from '@tabler/icons-react';
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
    <Flex
      justify="center"
      align="center"
      mt="sm"
    >
      <Flex
      gap="sm"
      >
        {/* TODO add navbar */}
        <Link href="/home/daily">
          <ActionIcon variant="filled" color="gray" size="md" aria-label="Settings">
            <IconPhoto stroke={1.5} />
          </ActionIcon>
        </Link>
        <Link href="/home/settings">
          <ActionIcon variant="filled" color="gray" size="md" aria-label="Settings">
            <IconSettings stroke={1.5} />
          </ActionIcon>
        </Link>
        <ActionIcon variant="filled" color="gray" size="md" aria-label="Logout" onClick={handleSignOut}>
          <IconLogout stroke={1.5} />
        </ActionIcon>
      </Flex>
    </Flex>

  )
}

export default Navbar