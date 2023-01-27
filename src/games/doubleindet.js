import state from '@/games/state'

const doubleindet = {
  start: state({
    actions: {
      up: [
        { p: 0.5, next: state({ rewards: [ { p: 1.0, value: 0 }, ] }) },
        { p: 0.5, next: state({ rewards: [
          { p: 0.25, value: 1 },
          { p: 0.75, value: 5 },
        ] }) },
      ],
      right: [{ p: 1.0, next: state({ rewards: [ { p: 1.0, value: 1 }, ] }) }],
    }
  }),
}

export default doubleindet
