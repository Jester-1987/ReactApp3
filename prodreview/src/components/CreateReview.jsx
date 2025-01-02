import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateReview() {

    const [product, setProduct] = useState('');
    const [review, setReview] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); // State for loading error messsage

    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        if (!product.trim() || !review.trim() || !author.trim()) {
            setError("Cannot leave blank! Please fill in all fields.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // reset error message on new submission

        if (!validateForm())
        {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-review.php`, {
                product,
                review,
                author
            });
            console.log(response.data);
            navigate('/');
        }
        catch (error) {
            console.error(error);
            setError('Failed to post review. :( Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create a Product Review</h2>
            {error && <div className="alert alert danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="product" className="form-label">
                        Product Name
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="product"
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">
                        Review
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="review"
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        Author
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="author"
                        onChange={(e) => setauthor(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Posting review...</span> : 'Create Review'}
                </button>
            </form>
        </div>
    );
    
}

export default CreateReview;