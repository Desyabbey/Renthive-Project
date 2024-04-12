"use client";


import Avatar from "../Avatar";
import Menuitem from "./MenuItem";
import useRentModal from "@/app/hooks/UseRentModal";
import useLoginModal from "@/app/hooks/UseLoginModal";
import useRegisterModal from "@/app/hooks/UseRegisterModal";

import { safeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";

interface UserMenuProps {
    currentUser?: safeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
           return LoginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, LoginModal, rentModal])

    return ( 
        <div className="
            relative
        "
        >
        <div className="
            flex
            flex-row
            items-center
            gap-3
        "
        >
        <div 
        className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
        "
            onClick={onRent}
        >
            Renthive your home 
        </div>
        <div className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
        "
        onClick={toggleOpen}
        >
        <AiOutlineMenu />
        <div className="
            hidden
            md:block
        "
        >
        <Avatar src={currentUser?.image} />
        </div>
        </div>
        </div>

        {isOpen &&(
        <div className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
             bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
            >
        <div className="
            flex
            flex-col
            cursor-pointer
            "
            >
        {currentUser ? (
            <>
            <Menuitem 
                onClick={() => router.push("/trips")}
                label="My trips"
            />
            <Menuitem 
                onClick={() => {}}
                label="My favourites"
            />
            <Menuitem 
                onClick={() => router.push("/reservations")}
                label="My reservations"
            />
            <Menuitem 
                onClick={() => {}}
                label="My properties"
            />
            <Menuitem 
                onClick={rentModal.onOpen}
                label="Renthive my home"
            />
            <hr />
            <Menuitem 
                onClick={() => signOut()}
                label="Logout"
            />
        </>
        ) : (        
            <>
                <Menuitem 
                    onClick={LoginModal.onOpen}
                    label="Login"
                />
                <Menuitem 
                    onClick={RegisterModal.onOpen}
                    label="Sign up"
                />
            </>
            )}
        </div>
            </div>
        )}
    </div>
     );
}

export default UserMenu;