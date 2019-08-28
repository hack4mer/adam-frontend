import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

class App extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      showForm: false
    }
   }

  render(){

   return  (
    <div className="App">
      <header className="App-header">
        {!this.state.showForm && <img src={logo} className="App-logo" alt="logo" />}
        <p>
          Basic react UI with Flask + MySQl backend
        </p>

        {this.state.showForm && <Form/>}

        {!this.state.showForm && <span   
          style={{color:"#9ae6ff",textDecoration:"underline",cursor:"pointer"}}  
          onClick={()=>this.setState({showForm:true})}
          >
          Try it
        </span>}

      </header>
    </div>
  );
}
}

export default App;
