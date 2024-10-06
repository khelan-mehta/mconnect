"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../env";
import { lookInSession } from "../../../lib/session";

interface Review {
  _add: string;
  cRating: string;
}

const MyReviews = ({ usrId }: { usrId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userId = lookInSession("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/facts/my-reviews/${userId}`
        );
        const { payload, msg, err } = response.data;

        if (err) {
          throw new Error(msg);
        }

        // Extract the first array of reviews from the nested payload
        const reviewsData = payload[0].map((review: any) => ({
          _add: review._doc._add,  // Extracting address (_add)
          cRating: review.cRating,
        }));

        setReviews(reviewsData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [userId]);

  return (
    <div className="container mx-auto mt-24 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Address</th> {/* Changed header to Address */}
            <th className="border border-gray-300 p-2">Cumulative Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review._add} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{review._add}</td> {/* Displaying address */}
                <td className="border border-gray-300 p-2">{review.cRating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center p-4">
                No reviews found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
