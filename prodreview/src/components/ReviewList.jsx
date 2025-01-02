import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReviewList() {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const revewsPerPage = 10;

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews.php?page=${currentPage}`);
                setReviews(response.data.reviews);
                setTotalReviews(response.data.totalReviews);
                setIsLoading(false);
            }
            catch(error) {
                console.error(error);
                setError('Failed to load reviews.');
                setIsLoading(false)
            }

        };

        fetchReviews();
    }, [currentPage]);

    const totalPages = Math.ceil(totalReviews / revewsPerPage);
    const goToPreviousPage = () => setCurrentPage(currentPage -1);
    const goToNextPage = () => setCurrentPage(currentPage +1);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Reviews</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {isLoading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length ? (
                    reviews.map(review => (
                        <div className="col-md-6" key={review.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{review.product}</h5>
                                    <p className="card-text">By {review.author} on { new Date(review.publish_date).toLocaleDateString()}</p>
                                    <Link to={`/review/${review.id}`} className="btn btn-primary">Read More</Link>
                                </div>
                            </div>    
                        </div>    
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
            {/* Pagination code will go here */}
        </div>
    );
}

export default ReviewList;