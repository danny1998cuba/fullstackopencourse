import { useEffect } from "react";
import { useState } from "react";
import {
  createPerson,
  deletePerson,
  getPersons,
  updatePerson,
} from "./services/persons";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    getPersons().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const throwMessage = (text, messageType) => {
    setMessage(text);
    setMessageType(messageType);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newNameToSet = newName.trim();
    const newNumberToSet = newNumber.trim();

    if (newNameToSet !== "" && newNumberToSet !== "") {
      const existing = persons.find((p) => p.name === newNameToSet);

      if (existing) {
        const conf = confirm(
          `${newNameToSet} is already added to phonebook, replace the old number with a new one?`
        );
        if (conf) {
          updatePerson(existing.id, {
            ...existing,
            number: newNumberToSet,
          })
            .then((res) => {
              setPersons(
                persons.map((p) => (p.id === existing.id ? res.data : p))
              );
              throwMessage(
                `Phone number for ${res.data.name} updated`,
                "success"
              );
            })
            .catch((e) => {
              if (e.status === 404) {
                setPersons(persons.filter((p) => p.id !== existing.id));
                throwMessage(
                  `Information of ${existing.name} has already been removed from server`,
                  "error"
                );
              } else {
                throwMessage(e.response.data.error, "error");
              }
            });
        }
      } else {
        createPerson({
          name: newNameToSet,
          number: newNumberToSet,
          id: String(persons.length + 1),
        })
          .then((res) => {
            setPersons([...persons, res.data]);
            throwMessage(`Added ${res.data.name}`, "success");
          })
          .catch((e) => {
            throwMessage(e.response.data.error, "error");
          });
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

  const onDelete = (person) => {
    const conf = confirm(`Delete ${person.name}?`);

    if (conf) {
      deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
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
      <Notification message={message} type={messageType} />

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
      <Persons persons={shownPersons} onDelete={onDelete} />
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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
