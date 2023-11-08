import React from 'react';

const SECURITY_CODE = "paradigm";

function UseState({ name }) {
    const [state, setState] = React.useState({
        error: false,
        loading: false,
        value: '',
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    }
    
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
            confirmed: false
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
    }

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
                    onChange={(event) => onWrite(event.target.value)}    
                />
                <button
                    onClick={() => onCheck()}
                >Check</button>
            </div>
        );
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>We ask for confirmation, are you sure?</p>
                <button
                    onClick={() => onDelete()}
                >Yes, delete</button>
                <button
                    onClick={() => onReset()}
                >No, I regretted it</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Successfully deleted</p>
                <button
                    onClick={() => onReset()}
                >Reset, go back</button>
            </React.Fragment>
        );
    }
}

export { UseState };