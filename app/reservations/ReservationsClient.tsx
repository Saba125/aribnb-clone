"use client"
import React, { useCallback, useState } from "react"
import { SafeReservation, SafeUser } from "../types"
import Container from "../components/Container"
import Heading from "../components/Heading"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import ListingCard from "../components/listings/ListingCard"
interface ReservationsClientProps {
  currentUser?: SafeUser | null
  reservation: SafeReservation[]
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservation,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")
  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios
      .delete(`/api/reservations/${id}`)
      .then((res) => {
        toast.success("Reservation cancelled")
      })
      .catch((res) => {
        toast.error("Something went wrong")
      })
      .finally(() => setDeletingId(""))
  }, [])
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
