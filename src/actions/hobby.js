export const addNewHobby = (hobby) => {
    return {
        type: "ADD_HOBBY",
        payload: hobby
    }
}

export const setActiveHobby = (hobby) => {
    return {
        type: "TYPE_ACTIVE_HOBBY",
        payload: hobby,
    }
}