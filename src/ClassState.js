import React from 'react';
import { Loading } from "./Loading.js";

const SECURITY_CODE = "paradigm";

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false
        }
    }

    //componentDidMount() {
        //console.log("componentDidMount");
    //}

    // componentWillMount
    //UNSAFE_componentWillMount() {
       // console.log("UNSAFE_componentWillMount");
    //}

    //componentWillUnmount() {
        //console.log("componentWillUnmount");
    //}

    componentDidUpdate() {
        console.log("Actualizacion");

        if(!!this.state.loading) {
            setTimeout(() => {
                console.log("Doing the validation");
                
                if (this.state.value === SECURITY_CODE) {
                    this.setState({ error: false, loading: false });
                } else {
                    this.setState({ error: true, loading: false });
                }
    
                console.log("Finishing the validation");
            }, 3000)
        }
    }

    render() {

        return (
            <div>
                <h2>Delete {this.props.name}</h2>
                <p>Please, write the security code.</p>

                {(this.state.error && !this.state.loading) && (
                    <p>Error: the code is incorrect</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input
                    placeholder='Security code'
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }}    
                />
                <button
                    onClick={() => this.setState({ loading: true })}
                >Check</button>
            </div>
        );
    };
}

export { ClassState };