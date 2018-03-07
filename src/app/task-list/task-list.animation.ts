import { trigger, style, state, transition, animate } from '@angular/animations';

export const TaskLiatAnimate = trigger('taskState', [
    state('inactive', style({
      backgroundColor: 'LightGoldenRodYellow',
      transform: 'scale(1)'
    })),
    state('active',   style({
      backgroundColor: '#cfd8dc',
      transform: 'scale(1.2)'
    })),
    state('*', style({
      backgroundColor: 'LightGoldenRodYellow'
    })),

    transition('inactive <=> active',[ 
      style({
        backgroundColor: 'lightgreen',
        transform: 'rotate(25deg)'
      }),
      animate('400ms ease-in-out')
    ]),

    transition('active => void',[ 
      style({
        transform: 'translateY(-100%)'
      }),
      animate(100)
    ])
    
   
  ])