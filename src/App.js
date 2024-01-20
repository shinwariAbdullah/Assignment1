import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('react'); // Default search term
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5`
        );
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Any Book</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {books.map(book => (
            <div key={book.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt="Book cover"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.volumeInfo.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
