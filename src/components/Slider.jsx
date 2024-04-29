import React from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(3));
      const querySnap = await getDocs(q);
      var listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          imgUrls: doc.data().imgUrls,
          data: doc.data(),
          type: doc.data().type,
          name: doc.data().name,
          rent: doc.data().rent,
          timestamp: doc.data().timestamp,
          discountedPrice: doc.data().discountedPrice,
          regularPrice: doc.data().regularPrice,
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
        >
          {listings.map((data, id) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/${data.type}/${data.id}`)}
            >
              <div
                className="relative w-full h-[300px] overflow-hidden"
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p
                className="absolute text-[#f1faee] left-1 top-3 font-medium
              max-w-[90%] bg-[#457b9d] px-2 py-1 rounded-br-2xl shadow-l 
              transiton duration-150 ease-in-out opacity-90 "
              >
                {data.name}
              </p>
              <p
                className="absolute text-[#f1faee] left-1 bottom-1 font-medium
              max-w-[90%] bg-[#e63946] px-2 py-1 rounded-tr-2xl shadow-l 
              transiton duration-150 ease-in-out opacity-90 space-x-2"
              >
                $
                {data.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ??
                  data.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" && " / Month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
