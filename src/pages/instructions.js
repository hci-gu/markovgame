import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <h1>Instruktioner</h1>
        <p>Varje spel spelas på en liten spelplan med några få platser och pilar som visar hur du kan förflytta dig mellan platserna. En av platserna är startpunkten. Varje spel spelas i 75 korta omgångar. I varje omgång börjar du i startpunkten och förflyttar dig till andra platser med hjälp av piltangenterna på datorn. När du kommer till vissa platser kan du vinna eller förlora poäng, med vissa sannolikheter. När du har nått vägs ände är omgången färdig och då räknas dina poäng för omgången ihop.</p>
        <p>När du börjar spela ett nytt spel vet du ingenting om hur just det spelet fungerar. Du behöver då prova dig fram i början för att få en bild av hur spelet fungerar och hur du kan göra för att samla så många poäng som möjligt.</p>
        <p>Din uppgift i varje spel är alltså att samla in så många poäng som möjligt under 75 omgångar, genom att lära dig vilken väg som är den bästa.</p>
        <p>Det finns två provspel som du kan prova för att lära dig att spela spelen. Gå <Link href='tests'>vidare här</Link> för att testa provspelen!</p>
        </div>
    </>
  )
}
