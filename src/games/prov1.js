import state from '@/games/state'

const balloon = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [
        { p: 1/3., value: 0 },
        { p: 1/3., value: 1 },
        { p: 1/3., value: 2 },
      ] }) }],
      left: [{ p: 1.0, next: state({ rewards: [
        { p: 1/2., value: 0 },
        { p: 1/2., value: 3 },
      ] }) }],
    }
  }),
}

export default balloon
