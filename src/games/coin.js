import state from '@/games/state'

const coin = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [
        { p: 0.5, value: 1 },
        { p: 0.5, value: 0 },
      ] }) }],
    }
  }),
}

export default coin
