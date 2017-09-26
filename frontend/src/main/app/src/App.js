import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor(){
    super();
    this.state = {lista : []};
    this.save = this.save.bind(this);
  }

  save(event){
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/pessoas/pessoa',
      contentType : 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome : 'Wilson', nascimento: '01/01/2001'}),
      success: function(response){
          console.log('sucesso');
          console.log(response);
      },
      error: function(response){
        console.log('erro');
        console.log(response);
      }  
    });
  }
  
  componentWillMount(){
    $.ajax({
      url : 'http://localhost:8080/pessoas/',
      dataType : 'json',
      success: function(response){
        this.setState({lista: response}); 
      }.bind(this)
    });
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
                  <input id="nome" type="text" name="nome" value=""  />                  
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label> 
                  <input id="email" type="email" name="email" value=""  />                  
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label> 
                  <input id="senha" type="password" name="senha"  />                                      
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