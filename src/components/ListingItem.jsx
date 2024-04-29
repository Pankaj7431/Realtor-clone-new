import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <li
      className="relative bg-white flex flex-col 
      justify-between items-center
      shadow-md hover:shadow-xl rounded-md 
      overflow-hidden transition-shadow duration-150 mx-[10px] my-[10px]"
    >
      <Link className="contents" to={`/${listing.type}/${id}`}>
        <img
          className="h-[190px] w-full object-cover hover:scale-105 
          transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt="Property Image"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white 
        uppercase text-xs font-semibold 
        rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-xs mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl ">{listing.name}</p>
          <p className="text-[#457b9d] font-semibold mt-2 truncate">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <p className="font-bold text-xs">
              {listing.bathrooms > 1 ? `${listing.bedrooms} Baths` : "1 Bath"}
            </p>
          </div>
        </div>
      </Link>
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 cursor-pointer 
        h-4 text-blue-500"
          onClick={() => onEdit(listing.id)}
        />
      )}
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 cursor-pointer 
        h-[14px] text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
    </li>
  );
}
