import state from '@/games/state'

const memory = {
  start: state({
    actions: {
      up: [
        { p: 0.5, next: state({
          actions: {
            up: [{p: 1.0, next: state({ rewards: [{p: 1.0, value: 1}] })}],
            down: [{p: 1.0, next: state({ rewards: [{p: 1.0, value: 0}] })}],
          }
        })},
        { p: 0.5, next: state({
          actions: {
            up: [{p: 1.0, next: state({ rewards: [{p: 1.0, value: 0}] })}],
            down: [{p: 1.0, next: state({ rewards: [{p: 1.0, value: 1}] })}],
          }
        })},
      ],
    }
  }),
}

export default memory
