import React, { useReducer } from 'react';

const SECURITY_CODE = "paradigm";

const initialState = {
    error: false,
    loading: false,
    value: '',
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
};

const reducerObject = (state, action) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]: {
        ...state,
        value: action.payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
        confirmed: false
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },

}[action.type]);

const reducer = (state, action) => {
   return reducerObject(state, action) || state;
}

function UseReducer({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onWrite = ({ target }) => dispatch({ type: actionTypes.write, payload: target.value });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });

    React.useEffect(() => {
        console.log("Initializing effect");
        
        if(!!state.loading) {
            setTimeout(() => {
                console.log("Doing the validation");
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
                console.log("Finishing the validation");
            }, 3000)
        }
        
        console.log("Finishing the effect");
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>
                <p>Please, write the security code.</p>
    
                {(state.error  && !state.loading) && (
                    <p>Error: the code is incorrect</p>
                )}
    
                {state.loading && (
                    <p>Loading</p>
                )}
    
                <input
                    placeholder='Security code'
                    value={state.value}
                    onChange={onWrite}    
                />
                <button
                    onClick={onCheck}
                >Check</button>
            </div>
        );
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>We ask for confirmation, are you sure?</p>
                <button
                    onClick={onDelete}
                >Yes, delete</button>
                <button
                    onClick={onReset}
                >No, I regretted it</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Successfully deleted</p>
                <button
                    onClick={onReset}
                >Reset, go back</button>
            </React.Fragment>
        );
    }
}

export { UseReducer };