import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Spinner from './spinner';
 
export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', latLng: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {


    
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        
        this.props.getAddress(address);
        this.props.getLocation(latLng);
        return this.setState({ address, latLng}
        
        )
      
      })
      .catch(error => console.error('Error', error));
    
  
    };
 
  render() {
    const searchOptions = {
      types: ['(cities)'],
      componentRestrictions: {country: "es"}
     }
    {console.log(JSON.stringify(this.state))}
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={(e) => this.handleChange(e)}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
        // componentRestrictions={{country: "es"}}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='row'>
          <div className="input-field col s12">
            <input
              {...getInputProps({
                className: 'validate location-search-input',
                id: 'location',
              })}
            />

            <label for='location'>Selecciona ciudad</label>
            {(suggestions.length > 0 || loading) && <div className="autocomplete-dropdown-container">
              {loading && <Spinner />}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>}
          </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}