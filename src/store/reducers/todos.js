 import * as actionTypes from '../action';

const initState = {
    // id_count: 4,
    // items: [
    //     {id: 0, title: "Buy some 🥛", isDone: false, due: moment(new Date(2020, 3, 10))},
    //     {id: 1, title: "Run 🏃 a 5K‍", isDone: true, due: moment(new Date(2020, 0, 10))},
    //     {id: 2, title: "Watch 🎬", isDone: true, due: null},
    //     {id: 3, title: "Spend a day in a 🏞", isDone: false, due: moment()}
    // ],
    items: []
};

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.CHECKBOX:
            return {...state,
                items: state.items.map(item=>(item.id === action.id ? {...item, isDone: !item.isDone} : item))
            };
        case actionTypes.ADD_ITEM:
            return {...state,
                id_count: state.id_count+1,
                items: [...state.items,
                {...action.newItem, isDone: false, id: state.id_count}
            ]};
        case actionTypes.SET_TODO_ITEMS:
            return action.todos;
        default:
            return state;
    }
};


export default reducer;