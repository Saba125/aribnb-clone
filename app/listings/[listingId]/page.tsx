import { currentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { categories } from "@/app/components/navbar/Categories";
import getReservations from "@/app/actions/getReservation";
interface IParams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const user = await currentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }
  const category = () => {
    return categories.find((item) => item.label === listing.category);
  };
  return (
    <ListingClient
      reservations={reservations}
      currentUser={user}
      listing={listing}
    />
  );
};

export default ListingPage;
