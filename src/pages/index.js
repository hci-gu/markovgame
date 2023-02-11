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
        <Link href="/instructions"><button>Instruktioner</button></Link>
        <Link href="/test1"><button>Provspel 1</button></Link>
        <Link href="/test2"><button>Provspel 2</button></Link>
        <Link href="/trial"><button>Spela</button></Link>
        <Link href="/allgames"><button> ** all games ** </button></Link>
      </div>
    </>
  )
}
