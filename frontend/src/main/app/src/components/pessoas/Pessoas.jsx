import React, { Component } from 'react';
import '../../css/bootstrap.min.css';
import '../../css/custom.css';
import $ from 'jquery';
import DataTable from  '../../components/table/DataTable';
import { FormGroupInputText }  from  '../../components/control/FormGroup';
import PubSub from 'pubsub-js';

export default class PessoasBox extends Component{

    constructor(){
        super();
        this.state = {lista : []};
        this.carregaLista = this.carregaLista.bind(this);
        this.updateList = this.updateList.bind(this);
    }
      
    componentDidMount(){
        this.carregaLista();
        PubSub.subscribe('pessoasList', function(topic, list){
            this.setState({lista: list});
        }.bind(this));
    }

    updateList(){
        this.carregaLista();
    }

    carregaLista(){
        $.ajax({
            url : 'http://dougllasfps.j.layershift.co.uk/api/pessoas/',
            dataType : 'json',
            success: function(response){
                this.setState({lista: response}); 
            }.bind(this)
        });
    }
    
    render(){
        return (
            <div>
                <PessoasForm updateListCallBack={this.updateList}/>
                <PessoasList list={this.state.lista} />
            </div>
        );
    }
}

export class PessoasForm extends React.Component{

    constructor(){
        super();
        this.state = {nome : '', nascimento: '', cpf: ''};
        this.save = this.save.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setNascimento = this.setNascimento.bind(this);
        this.setCpf = this.setCpf.bind(this);
    }

    setNome(event){
        this.setState({nome: event.target.value});
    }

    setNascimento(event){
        this.setState({nascimento: event.target.value});
    }

    setCpf(event){
        this.setState({cpf: event.target.value});
    }
    
    save(event){
        event.preventDefault();
        $.ajax({
            url: 'http://dougllasfps.j.layershift.co.uk/api/pessoas/pessoa',
            contentType : 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome : this.state.nome, nascimento: this.state.nascimento, cpf: this.state.cpf}),
            success: function(response){
                this.props.updateListCallBack();
            }.bind(this),
            error: function(response){
                console.log(response.responseText);
            }  
        });
    }

    render(){
        return(
            <form onSubmit={this.save} method="post">
                <div className="row">
                    <div className="col-md-12">
                      <FormGroupInputText name="nome" label="Nome: *" value={this.state.nome}  onChange={this.setNome} />
                    </div>
                    <div className="col-md-12">
                      <FormGroupInputText name="nascimento" label="Nascimento: *" value={this.state.nascimento}  onChange={this.setNascimento} />
                    </div>
                    <div className="col-md-12">
                      <FormGroupInputText name="cpf" label="CPF: *" value={this.state.cpf}  onChange={this.setCpf} />
                    </div>
                    <div className="col-md-12">                              
                      <button type="submit" className="btn btn-primary">Save</button>       
                    </div>
                </div>
            </form> 
        );
    }
}

export class PessoasList extends React.Component{
    render(){
            return(
                <DataTable headers={["Nome", "Nascimento", "CPF"]} >
                    {
                        this.props.list.map(function(pessoa){
                            return (
                                <tr key={pessoa.id}>
                                    <td>{pessoa.nome}</td>
                                    <td>{pessoa.nascimento}</td>
                                    <td>{pessoa.cpf}</td>
                                </tr>
                            );
                        })
                    }
                </DataTable>  
            );
    }
}