import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Välkommen till testet!</h1>
        <p>Inga personuppgifter kommer att samlas in och resultaten från testet kommer endast att användas i forskningssyfte i anonymiserad form.</p>
        <p>Tryck <Link href="trial">här</Link> för att starta spelet. Genom att fortsätta ger du ditt samtycke till att dina resultat användas i forskningssyfte.</p>
      </div>
    </>
  )
}
