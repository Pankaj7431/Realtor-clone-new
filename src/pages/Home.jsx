import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  // Get Offer Listing Data
  useEffect(() => {
    async function fetchListings() {
      try {
        //get reference
        const linstingRef = collection(db, "listings");
        //create the query
        const q = query(
          linstingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute querry
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
        console.log(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Rent
  const [rentListings, setRentListings] = useState(null);
  // Get Offer Listing Data
  useEffect(() => {
    async function fetchListings() {
      try {
        //get reference
        const linstingRef = collection(db, "listings");
        //create the query
        const q = query(
          linstingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute querry
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
   // Rent
   const [saleListings, setSaleListings] = useState(null);
   // Get Offer Listing Data
   useEffect(() => {
     async function fetchListings() {
       try {
         //get reference
         const linstingRef = collection(db, "listings");
         //create the query
         const q = query(
           linstingRef,
           where("type", "==", "sale"),
           orderBy("timestamp", "desc"),
           limit(4)
         );
         //execute querry
         const querySnap = await getDocs(q);
         const listings = [];
         querySnap.forEach((doc) => {
           return listings.push({
             id: doc.id,
             data: doc.data(),
           });
         });
         setSaleListings(listings);
       } catch (error) {
         console.log(error);
       }
     }
     fetchListings();
   }, []);
  return (
    <div className="">
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offers">
              <p
                className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-in-out"
              >
                Show More Offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for Rent</h2>
            <Link to="/offers">
              <p
                className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-in-out"
              >
                Show More Rent Properties
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for Sell</h2>
            <Link to="/offers">
              <p
                className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-in-out"
              >
                Show More Sell Properties
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
