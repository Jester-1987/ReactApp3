import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Review = () => {
    const { id } = useParams();
    const [review, setReview] = useState(null);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/review.php/${id}`);
            const review = response.data.data;
            setReview(review);
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        fetchPost();
        }, []);

    return (
        <div className="container my-4">
            <h1 className="mb-4">{review.product}</h1>
            <p>{review.review}</p>
            {/* a little confusing in hindsight, in future I'll try to use more desciptive names.  */}
            <hr />
            <div className="d-flex justify-content-between">
                <div>
                    <small className="text-muted">
                        Reviewed by {review.author} on {review.date}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Review;