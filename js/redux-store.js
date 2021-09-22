//--Action Creators--
//-Peson Who is Submitting the form-
const newBooking = (name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            name,
            amount
        }
    };
};

const cancelBooking = (name, refundAmount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            name,
            refundAmount
        }
    };
};

//--Reducers--

const reservationHistory = (oldReservationList=[], action) => {
    if(action.type === "NEW_BOOKING") {
        return [...oldReservationList, action.payload] //you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } else if (action.type === "CANCEL_BOOKING") {  /* checking free ticket space */
        return oldReservationList.filter(record => {
            return record !== action.payload.name; // filter method retur array so we are not return array her, (not use bracket)
        });
    }

    return oldReservationList;
}

//for cancel action
const cancelationHistory = (oldCancelationList=[], action) => {
    if(action.type === "CANCEL_BOOKING") {
        return [...oldCancelationList, action.payload] //you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } 

    return cancelationHistory;
}

const accounting = (totalMoney = 100, action) => {
    if(action.type === "NEW_BOOKING") {
        return totalMoney + action.payload.amount;
    }
    if(action.type === "CANCEL_BOOKING") {
        return totalMoney = action.payload.refundAmount;//you need to destructor the old list and aad new info , if you dont de structor old list entirely change
    } 

    return accounting;
}



//--Redux store--