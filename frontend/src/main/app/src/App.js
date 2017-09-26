import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor(){
    super();
    this.state = {lista : [], nome : '', nascimento: '', cpf: ''};
    this.save = this.save.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setNascimento = this.setNascimento.bind(this);
    this.setCpf = this.setCpf.bind(this);
    this.carregaLista = this.carregaLista.bind(this);
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

  carregaLista(){
    $.ajax({
      url : 'http://localhost:8080/pessoas/',
      dataType : 'json',
      success: function(response){
        this.setState({lista: response}); 
      }.bind(this)
    });
  }

  save(event){
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/pessoas/pessoa',
      contentType : 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome : this.state.nome, nascimento: this.state.nascimento, cpf: this.state.cpf}),
      success: function(response){
          console.log(response);
          console.log(response.statusCode);
          this.carregaLista();
      }.bind(this),
      error: function(response){
        console.log(response.responseText);
      }  
    });
    
  }
  
  componentWillMount(){
    this.carregaLista();
  }

  render() {
    return (
      <div id="layout">
        <a href="#" id="menuLink" className="menu-link">
            <span></span>
        </a>
  
        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Company</a>
    
                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">About</a></li>
    
                    <li className="pure-menu-item">
                        <a href="#" className="pure-menu-link">Services</a>
                    </li>
    
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
                </ul>
            </div>
        </div>
  
        <div id="main">
          <div className="header">
            <h1>Cadastro de Pessoas</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.save} method="post">
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label> 
                  <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}  />                  
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Nascimento</label> 
                  <input id="email" type="text" name="email" value={this.state.nascimento} onChange={this.setNascimento}   />                  
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label> 
                  <input id="senha" type="text" name="senha" value={this.state.cpf} onChange={this.setCpf}  />                                      
                </div>
                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
              </form>             

            </div>  
            <div>            
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Nascimento</th>
                    <th>CPF</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function(pessoa){
                        return (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.nascimento}</td>
                                <td>{pessoa.cpf}</td>
                            </tr>
                        );
                    })
                  }
                </tbody>
              </table> 
            </div>             
          </div>
        </div>            
      </div>
    );
  }
}

export default App;