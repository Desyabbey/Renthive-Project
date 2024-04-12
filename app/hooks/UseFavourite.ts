import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import useLoginModal from "./UseLoginModal";
import { safeUser } from "../types";

interface IUseFavorite {
    listingId: string;
    currentUser?: safeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasfavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasfavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong.')
        }
    }, [
        currentUser,
        hasfavorited,
        listingId,
        loginModal,
        router
    ]);

    return {
        hasfavorited,
        toggleFavorite
    }
}


export default useFavorite;