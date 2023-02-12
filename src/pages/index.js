import Link from 'next/link'
import { useRouter } from 'next/router'

import { setParticipantId } from '@/utils/participant'

export default function Home() {
  // get query param id from url
  const { id } = useRouter().query

  if (id) {
    setParticipantId(id)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Link href="/instructions"><button>Instruktioner</button></Link>
        <Link href="/test1"><button>Provspel 1</button></Link>
        <Link href="/test2"><button>Provspel 2</button></Link>
        <Link href="/trial"><button>Spela</button></Link>
        <Link href="/allgames"><button> ** all games ** </button></Link> */}
        <h2>Välkommen till testet!</h2>
        <p>Testet består av fem olika spel av olika svårighetsgrad. Målet är att försöka samla så många poäng som möjligt i varje spel.</p>
        <p>Inga personuppgifter kommer att samlas in och resultaten från testerna kommer endast att användas i anonymiserad form i forskningssyfte.</p>
        <p><Link href='instructions'>Tryck här</Link> för att gå vidare till instruktionerna.</p>
      </div>
    </>
  )
}
