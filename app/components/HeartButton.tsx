'use client';


import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/UseFavourite";
import { safeUser } from "../types";

interface HeartButtonProps {
listingId: string;
currentUser?: safeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
listingId,
currentUser
}) => {
 const { hasfavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
 }); 

    return ( 
        <div
        onClick={toggleFavorite}
        className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
        "
        >
            <AiOutlineHeart 
            size={28}
            className="
                fill-white
                absolute
                -top-[2px]
                -right-[2px]
            "
            />
            <AiFillHeart 
                size={24}
                className={
                    hasfavorited ? 'fill-slate-800' : 'fill-neutral-500/70'
                }

            />
        </div>
     );
}

export default HeartButton;