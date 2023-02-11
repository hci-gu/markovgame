import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1>Instruktioner</h1>
        <p>Spelet kontrolleras med piltangenterna och behöver spelas med tangentbord.</p>
      </div>
    </>
  )
}
