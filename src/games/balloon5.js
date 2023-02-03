import state from '@/games/state'

const balloon4 = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [
        { p: 1.0, value: 1 },
      ] }) }],
      left: [{ p: 1.0, next: state({ rewards: [
        { p: 1/4., value: 1 },
        { p: 1/4., value: 6 },
        { p: 2/4., value: 0 },
      ] }) }],
    }
  }),
}

export default balloon4
