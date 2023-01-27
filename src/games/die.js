import state from '@/games/state'

const die = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [
        { p: 1/6., value: 1 },
        { p: 1/6., value: 2 },
        { p: 1/6., value: 3 },
        { p: 1/6., value: 4 },
        { p: 1/6., value: 5 },
        { p: 1/6., value: 6 },
      ] }) }],
    }
  }),
}

export default die
