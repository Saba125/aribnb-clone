"use client"

import { Suspense, useEffect, useState } from "react"
import { currentUser } from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"
import { Listing, User } from "@prisma/client"
import { SafeListing, SafeUser } from "../types"

const ListingPage = () => {
  const [listings, setListings] = useState<SafeListing[]>([])
  const [user, setUser] = useState<SafeUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch listings and user on mount
    const fetchData = async () => {
      try {
        const fetchedListings = await getFavoriteListings()
        const fetchedUser = await currentUser()
        console.log(fetchedListings)
        setListings(fetchedListings)
        setUser(fetchedUser)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    )
  }

  return (
    <Suspense fallback={<div>Loading Favorites...</div>}>
      <FavoritesClient listings={listings} currentUser={user} />
    </Suspense>
  )
}

export default ListingPage
