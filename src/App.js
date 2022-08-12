import "./App.css";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import axios from "axios";
import Films from "./components/Films";
import { toast } from "react-toastify";
import { RiDeleteBinFill } from "react-icons/ri";
import logo from "../src/logo.png";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // fetching characters
  const fetchApi = async () => {
    const res = await axios.get("https://swapi.dev/api/people");
    setData(res.data.results);
  };

  //removing the selected row
  const handleClick = (i) => {
    console.log(i);
    setData(
      data.filter((item, index) => {
        if (index !== i) {
          return item;
        }
      }, ...data)
    );
    toast.success("Başarılı bir şekilde sildiniz!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <>
        <div>
          <img id="image" src={logo} alt="logo" />
        </div>
        <div className="filter-inputs">
          <input
            type="text"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <table id="heroes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>
                Gender:{" "}
                <select
                  id="gender"
                  name="gender"
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <option value=""> All </option>
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                  <option value="n/a"> N/A </option>
                </select>
              </th>
              <th id="th-films">Films</th>
              <th>Action</th>
            </tr>
          </thead>
          {data
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              } else if (value.gender.toLowerCase() === search.toLowerCase()) {
                return value;
              }
            })
            .map((item, index) => (
              <tbody key={index} className="table-container">
                <tr id="tr-columns">
                  <td className="table-name">{item.name}</td>
                  <td className="table-height">{item.height}</td>
                  <td className="table-gender">{item.gender}</td>
                  <td className="table-films">
                    {item.films.map((url, index) => (
                      <Films url={url} key={index} />
                    ))}
                  </td>
                  <td>
                    <button
                      id="delete-button"
                      onClick={() => handleClick(index)}
                    >
                      <RiDeleteBinFill />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </>
    </div>
  );
}

export default App;
