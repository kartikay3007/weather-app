import React from 'react'; // Import React
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
            const data = await response.json();
            const options = data.data.map(city => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`
            }));
            return { options }; // Wrap the options array in an object with "options" property
        } catch (error) {
            console.error(error);
            return { options: [] }; // Return an empty options array in case of error
        }
    }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} />
    )
};
export default Search;