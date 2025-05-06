import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const newNameToSet = newName.trim();
    const newNumberToSet = newNumber.trim();

    if (newNameToSet !== "" && newNumberToSet !== "") {
      if (persons.some((p) => p.name === newNameToSet)) {
        alert(`${newNameToSet} is already added to phonebook`);
      } else {
        setPersons([
          ...persons,
          {
            name: newNameToSet,
            number: newNumberToSet,
            id: String(persons.length + 1),
          },
        ]);
      }
      setNewName("");
      setNewNumber("");
    }
  };

  const onFieldChange = (name, event) => {
    const value = event.target.value;
    switch (name) {
      case "name":
        setNewName(value);
        break;
      case "number":
        setNewNumber(value);
        break;
      default:
        console.log("Invalid field");
    }
  };

  const shownPersons =
    filterValue.trim() !== ""
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filterValue.trim().toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        activeFilter={filterValue}
        onFilter={(e) => setFilterValue(e.target.value)}
      />

      <h3>add a new</h3>
      <PersonForm
        fieldsValue={{ name: newName, number: newNumber }}
        onFieldChange={onFieldChange}
        onSubmit={onSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  );
};

const Filter = ({ activeFilter, onFilter }) => {
  return (
    <div>
      filter shown with <input value={activeFilter} onChange={onFilter} />
    </div>
  );
};

const PersonForm = ({ onSubmit, fieldsValue, onFieldChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input
          value={fieldsValue["name"]}
          onChange={(e) => onFieldChange("name", e)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={fieldsValue["number"]}
          onChange={(e) => onFieldChange("number", e)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
