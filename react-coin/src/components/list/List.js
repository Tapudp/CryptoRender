import React from 'react';
import {handleResponse} from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Pagination from './Pagination';
import Table from './Table';

class List extends React.Component{
   constructor(){
      super();

      this.state = {
         loading: true,
         currencies: [],
         error: null,
         totalPages: 0,
         page: 1,
      }
      this.handlePaginationClick = this.handlePaginationClick.bind(this);
   }

   componentDidMount(){
      this.fetchCurrencies();
   }

   fetchCurrencies() {
      this.setState({loading: true});

      const { page } = this.state;

      fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
         .then(handleResponse)
         .then((data) => {
            const { currencies, totalPages } = data;
            //console.log('Success', data);
            this.setState({
               currencies,
               totalPages,
               loading: false
            });
         })
         .catch((error) => {
            //console.log('Error', error);
            this.setState({
               error : error.errorMessage,
               loading: false
            });
         });
   }

   renderChangePercent(percent) {
      if(percent > 0 ){
            return <span className = "percent-raised">{percent}% &uarr;</span>
      } else if ( percent < 0 ){
            return <span className = "percent-fallen">{percent}% &darr;</span>
      } else {
            return <span>{percent}</span>
      }
   }

   handlePaginationClick = (direction) => {
         console.log(this);
      let nextPage = this.state.page;

      // Increment nextPage if direction variable is next, otherwise decrement
      nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

      this.setState({ page: nextPage }, () => {
            // call fetchCurrencies function inside setState's callback
            // because we have to make sure first page state is updated
            this.fetchCurrencies();
      });

   }

   render(){
         const {loading, error, currencies, page, totalPages} = this.state
         // render only loading component, if loading state is set to true
      console.log(this.state);

      // render only error message, if error occured while fetching data
      if(loading){
         return <div className="Loading-container"><Loading /></div>
      }

      if(error){
            return <div className="error">{error}</div>
      }

      return(
      <div>
            <Table 
                  currencies={currencies}
            />
            <Pagination 
                  page = {page}
                  totalPages = {totalPages}
                  handlePaginationClick = {this.handlePaginationClick}
            />
      </div>
      );
   }
}

export default List;