import { currentUser } from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
const PropertiesPage = async () => {
  const user = await currentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please log in" />;
  }
  const listings = await getListings({
    userId: user.id,
  });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have  no properties..."
      />
    );
  }
  return <PropertiesClient listings={listings} currentUser={user} />;
};
export default PropertiesPage;
