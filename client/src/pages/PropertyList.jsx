import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function PropertyList(props) {
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            async function fetchMyAPI() {
                setShowListingsError(false);
                const res = await fetch("/api/property/getByUser");
                const data = await res.json();
                if (data.success === false) {
                    setShowListingsError(true);
                    return;
                }

                setUserListings(data);
            }

            fetchMyAPI()
        } catch (error) {
            setShowListingsError(true);
        }
    }, []);

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/property/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>My Property listing</h1>
            {userListings.map((listing) => (

                <div
                    key={listing._id}
                    className='border rounded-lg p-3 flex justify-between items-center gap-4 mb-3'
                >
                    <Link to={`/property/${listing._id}`}>
                        <img
                            src={listing.imageUrls[0]}
                            alt='listing cover'
                            className='h-20 w-20 object-contain'
                        />
                    </Link>
                    <Link
                        className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                        to={`/property/${listing._id}`}
                    >
                        <p>{listing.name}</p>
                    </Link>

                    <div className='flex flex-col item-center'>
                        <button
                            onClick={() => handleListingDelete(listing._id)}
                            className='text-red-700 uppercase'
                        >
                            Delete
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                            <button className='text-green-700 uppercase'>Edit</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PropertyList;