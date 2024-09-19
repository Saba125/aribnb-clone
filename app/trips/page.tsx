import { currentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TriepsClient";
const TripsPage = async () => {
  const user = await currentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please log in" />;
  }
  const reservations = await getReservations({
    userId: user.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have not reserved any trips..."
      />
    );
  }
  return <TripsClient reservations={reservations} currentUser={user} />;
};
export default TripsPage;
