import state from '@/games/state'

const balloon2 = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [
        { p: 1/3., value: 1 },
        { p: 2/3., value: 0 },
      ] }) }],
      left: [{ p: 1.0, next: state({ rewards: [
        { p: 1/4., value: 1 },
        { p: 3/4., value: 0 },
      ] }) }],
    }
  }),
}

export default balloon2
