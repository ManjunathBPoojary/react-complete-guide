import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] Constructor');
  }

  state = {
    persons: [
      { id: '1', name: 'Manjunath', age: 22 },
      { id: '2', name: 'Sharada', age: 41 },
      { id: '3', name: 'Babu', age: 53 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentWillMount(){
    console.log('[App.js] componentWillMount');
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  //Triggered when you type something in input field
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      //To avoid object mutation, use spread operator
      ...this.state.persons[personIndex]
    };

    //display respective name at input field
    person.name = event.target.value;

    const newPersons = [...this.state.persons];


    newPersons[personIndex] = person;

    this.setState({ persons: newPersons });
  }

  deletePersonHandler = (personIndex) => {
    //const newPersons = this.state.persons.slice();
    const newPersons = [...this.state.persons];//ES6 Feature
    newPersons.splice(personIndex, 1);
    this.setState({ persons: newPersons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }


  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }
    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
