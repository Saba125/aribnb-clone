import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import React from "react";
import toast from "react-hot-toast";
interface IUseFavorite {
  listingId: string;
  currentUser: User;
}
export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = () => {
    const list = currentUser.favoriteIds || [];
    return list.includes(listingId);
  };
  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;
      if (hasFavorited()) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }
      await request();
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something wentt wrong.");
    }
  };
  return {
    hasFavorited,
    toggleFavorite,
  };
};
