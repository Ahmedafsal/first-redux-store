//--Action Creators--
//-Peson Who is Submitting the form-
const newBooking = (name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            name,
            amount,
        },
    };
};

const cancelBooking = (name, refundAmount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            name,
            refundAmount,
        },
    };
};

//--Reducers--

const reservationHistory = (oldReservationList = [], action) => {
    if(action.type === "NEW_BOOKING") {
        return [...oldReservationList, action.payload] //you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } else if (action.type === "CANCEL_BOOKING") {  
        return oldReservationList.filter(record => {
            return record.name !== action.payload.name; // filter method retur array so we are not return array her, (not use bracket)
        });
    }

    return oldReservationList;
}

//for cancel action
const cancellationHistory = (oldCancellationList = [null], action) => {
    if(action.type === "CANCEL_BOOKING") {
        return [...oldCancellationList, action.payload]; //you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } 

    return oldCancellationList;
}

const accounting = (totalMoney = 100, action) => {
    if(action.type === "NEW_BOOKING") {
        return totalMoney + action.payload.amount;
    }
    if(action.type === "CANCEL_BOOKING") {
        return totalMoney - action.payload.refundAmount;//you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } 

    return totalMoney;
}



//--Redux store--
console.log(Redux) // check the library we added in htl file it reurns an object
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory,
});

const store = createStore(railwayCentralStore);

const action = newBooking("Afsal", 20); // action
store.dispatch(action); // dipatch action
store.dispatch(newBooking("Sam", 40));
store.dispatch(newBooking("Abhi", 30));  
store.dispatch(cancelBooking("Afsal", 10));  
console.log(store.getState()); // getting data

