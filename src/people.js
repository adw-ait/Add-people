import React, { useState } from "react";
import { data } from "./data";
import "./style.css";

function People() {
  const [input, setinput] = useState("");
  const [people, setpeople] = useState(data);
  const [whichButton, setwhichButton] = useState("Submit");
  const [currentSelected, setcurrentSelected] = useState("");

  const getIndex = people.length;
  const handleSubmitUpdate = (e) => {
    let btnVal = e.target.value;
    if (btnVal === "Submit") {
      setpeople(() => {
        return [...people, { id: getIndex + 1, name: input }];
      });
      setinput("");
    } else if (btnVal === "Update") {
      const newPeople = [...people];
      setpeople(() => {
        newPeople[currentSelected].name = input;
        return newPeople;
      });

      setinput("");
      setwhichButton("Submit");
    }
  };

  const handleEdit = (e) => {
    setinput(e.name);
    setcurrentSelected(e.id - 1);
    setwhichButton("Update");
  };
  const handleInput = (e) => {
    setinput(e.target.value);
  };

  const handleRemove = (e) => {
    setpeople(
      people.filter((peep) => {
        return peep.id !== e.id;
      })
    );
  };

  return (
    <div className="centerContent">
      <div className="row">
        <div className="col">
          <div className="inputHere">
            <input
              className="inputCust"
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Input here"
            />
          </div>
          <button
            className="editDelete submit inputHere"
            value={whichButton}
            onClick={handleSubmitUpdate}
            disabled={!input}
          >
            {whichButton}
          </button>
        </div>
      </div>

      <div className="">
        {people.map((peep) => {
          return (
            <div key={peep.id} className="card blue-grey darken-1">
              <div className="card-content white-text">
                <p className="cardContent">{peep.name}</p>
              </div>
              <div className="card-action">
                <button
                  className="editDelete"
                  onClick={() => handleEdit({ id: peep.id, name: peep.name })}
                >
                  Edit
                </button>{" "}
                <button
                  className="editDelete delete"
                  onClick={() => handleRemove({ id: peep.id })}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default People;
