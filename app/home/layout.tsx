
import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto, IconSettings } from '@tabler/icons-react';
import React from 'react';


interface Props {
  children: React.ReactNode
}

const HomeLayout = ({ children }: Props) => {

  return (
    <>
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
      {children}
    </>
  )

}


export default HomeLayout