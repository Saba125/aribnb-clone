"use client"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeListing, SafeReservation, SafeUser } from "../types"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"
import { Listing } from "@prisma/client"

interface PropertiesClientProps {
  listings: Listing[]
  currentUser?: SafeUser | null
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")
  const onCancel = (id: string) => {
    setDeletingId(id)
    axios
      .delete(`/api/listings/${id}`)
      .then((res) => {
        toast.success("listing deleted")
        router.refresh()
      })
      .catch((res) => [toast.error("Something went wrong")])
      .finally(() => {
        setDeletingId("")
      })
  }
  return (
    <div className="mt-10">
      <Container>
        <Heading title="Properties" subtitle="List of your propertie" />
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
      "
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default PropertiesClient
