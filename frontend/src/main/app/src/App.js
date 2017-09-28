import React, { Component } from 'react';
import PessoasBox from './components/pessoas/Pessoas';

class App extends Component {

  constructor(){
    super();
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-7 col-md-offset-2 " id="content">
                 <PessoasBox />
            </div>
          </div>
        </div>
    );
  }
}

export default App;