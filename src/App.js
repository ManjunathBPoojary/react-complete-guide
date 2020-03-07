import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Manjunath', age: 22 },
      { id: '2', name: 'Sharada', age: 41 },
      { id: '3', name: 'Babu', age: 53 }
    ],
    otherState: 'some other value',
    showPersons: false
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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red; //Button class+ Red class = Button Red 
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); //classes = ['red','bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
          </button>
        {persons}
      </div>
    );
  }
}

export default App;
