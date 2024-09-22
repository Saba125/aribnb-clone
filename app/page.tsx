import { useState } from "react"
import Container from "./components/Container"
import EmptyState from "./components/EmptyState"
import getListings, { IListingParams } from "./actions/getListings"
import ListingCard from "./components/listings/ListingCard"
import { auth } from "@/auth"
import { currentUser } from "./actions/getCurrentUser"
interface HomeProps {
  searchParams: IListingParams
}
export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const session = await auth()
  const user = await currentUser()
  const isEmpty = listings.length === 0
  if (isEmpty) {
    return <EmptyState showReset />
  }
  return (
    <Container>
      <div
        className="
    pt-32
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    "
      >
        {listings.map((listing) => {
          return (
            <ListingCard currentUser={user} key={listing.id} data={listing} />
          )
        })}
      </div>
    </Container>
  )
}
