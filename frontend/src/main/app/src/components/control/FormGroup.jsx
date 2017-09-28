import React from 'react';
import '../../css/bootstrap.min.css';

export default class FormGroup extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label> 
                {this.props.children}             
            </div>
        );
    }
}

export class FormGroupInputText extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        var className = "form-control";

        if(this.props.className){
            className = this.props.className;
        }

        return (
            <FormGroup htmlFor={this.props.id} label={this.props.label}>
                <input id={this.props.id} 
                       type="text" 
                       name={this.props.name} 
                       className={className} 
                       value={this.props.value} 
                       onChange={this.props.onChange}  />           
            </FormGroup>
                       
        );
    }
}