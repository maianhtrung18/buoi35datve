import { combineReducers, createStore } from "redux";

const initialState = {
    startSelect: false,
    disableform: false,
    confirmation: false,
    user: {
    },
    reservedSeats: ['A1', 'A2', 'A9', 'B2', 'I6'],
    message: ''


}

const rootReducer = combineReducers({
    datVeReducer(state = initialState, action) {
        switch (action.type) {
            case "START_SELECT":
                state.startSelect = true
                state.disableform = true
                state.message = 'Please Select your Seats NOW!'
                state.user.name = action.name
                state.user.numberOfSeat = action.numberOfSeat
                return {...state}
            case "SELECTING":
                state.user.seats = action.mangSeats
                if(state.user.numberOfSeat === action.mangSeats.length.toString()){
                    state.startSelect = false
                }
                else{
                    state.startSelect = true
                }
                return {...state}
            case "CONFIRMATION":
                state.confirmation = action.confirmation
                state.reservedSeats = [...state.reservedSeats, ...state.user.seats]
                return {...state}
            default:
                return {...state}
        }
    }
})

export const store = createStore(rootReducer)

