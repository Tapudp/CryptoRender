import React from 'react';
import { API_URL } from '../../config';
import Loading from './Loading';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
constructor(){
   super();

   this.state = {
      searchQuery: '',
      loading: false
   }

   this.handleChange = this.handleChange.bind(this);
}


   handleChange(eve) {
      const searchQuery = eve.target.value;

      this.setState({ searchQuery });
      // If searchQuery isn't present don't send request to server
      if(!searchQuery) {
         console.log('input value is empty');
         return '';
      }

      this.setState({ loading: true });

      fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
         .then(handleResponse)
         .then((result) => {
            console.log(result);

            this.setState({ loading: false })
         });

      console.log(this.state);

   }

   render() {

      const {loading} = this.state;

      return (
         <div className="Search">
         <span className="Search-icon"/>
            <input 
            className="Search-input"
            type="text"
            placeholder="Currency name"
            onChange={this.handleChange} />

            {loading &&
            <div className="Search-loading">
               <Loading width='12px' height='12px' />
            </div>}
         </div>
      )
   }
}

export default Search;