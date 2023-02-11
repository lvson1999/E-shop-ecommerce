const initialState = {
    list: [],
    activeId: null
}
const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_HOBBY": {
            const newList = [...state.list]
            newList.push(action.payload);
            // dua vao local
            return {
                // giu lai state hien tai
                ...state, 

                // new list moi
                list:newList
            }
        }

        default:
            return state;
    }
};

export default hobbyReducer;