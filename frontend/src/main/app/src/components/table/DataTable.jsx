import React from 'react';

export default class DataTable extends React.Component{

    render(){
        return (
            <table className="table table-hover" >
                <Thead headers={this.props.headers}></Thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

class Thead extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.headers){
            var header = this.props.headers.map(function(header){
                return <th key={header}>{header}</th>;
            });

            return (
                <thead>
                    <tr>
                        {header}
                    </tr>
                </thead>
            );
        }

        return null;

        
    }
}

