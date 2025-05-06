import { useEffect } from "react";
import { useState } from "react";
import { getAll } from "./services/countries";
import CountryView from "./CountryView";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAll().then((res) => setCountries(res.data));
  }, []);

  const showedCountries =
    searchTerm !== ""
      ? countries.filter(
          (c) =>
            c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.name.official.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : countries;

  return (
    <div>
      <div>
        find countries{" "}
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
        />
      </div>

      <CountriesList countries={showedCountries} />
    </div>
  );
}

const CountriesList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null);
  }, [countries]);

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((c) => (
          <div key={c.cca2}>
            {c.name.common}{" "}
            <button onClick={() => setSelectedCountry(c)}>Show</button>
          </div>
        ))}

        <CountryView country={selectedCountry} />
      </div>
    );
  }

  if (countries.length === 1) return <CountryView country={countries[0]} />;

  return <div>There are no countries that match this filter</div>;
};

export default App;
