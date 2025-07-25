"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search as SearchIcon, MapPin, Calendar, Users } from 'lucide-react'

export default function SearchBar() {
    const [search, setSearch] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: '2'
    })

    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    const handleChange = (field: string, value: string) => {
        setSearch(prev => ({ ...prev, [field]: value }))
    }

    const handleSearch = () => {
        // Implement search logic for Search page
        console.log('Search page query:', search)
    }

    return (
        <form
            className="ziggla-bg-secondary rounded-lg p-4 search-box w-full max-w-5xl mx-auto"
            onSubmit={e => {
                e.preventDefault()
                handleSearch()
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Destination */}
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4 flex flex-col">
                    <label htmlFor="destination" className="block text-sm font-medium ziggla-text-secondary flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        Destination
                    </label>
                    <div className="relative">
                        <Input
                            id="destination"
                            type="text"
                            placeholder="Where to?"
                            value={search.destination}
                            onChange={e => handleChange('destination', e.target.value)}
                            className="pl-8"
                        />
                        <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none md:hidden" />
                    </div>
                </div>
                {/* Check In */}
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4 flex flex-col">
                    <label htmlFor="check-in" className="block text-sm font-medium ziggla-text-secondary flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Check In
                    </label>
                    <div className="relative">
                        <Input
                            id="check-in"
                            type="date"
                            min={today}
                            value={search.checkIn || today}
                            onChange={e => handleChange('checkIn', e.target.value)}
                            className="pl-8"
                        />
                        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none md:hidden" />
                    </div>
                </div>
                {/* Check Out */}
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4 flex flex-col">
                    <label htmlFor="check-out" className="block text-sm font-medium ziggla-text-secondary flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Check Out
                    </label>
                    <div className="relative">
                        <Input
                            id="check-out"
                            type="date"
                            min={search.checkIn || today}
                            value={search.checkOut || tomorrow}
                            onChange={e => handleChange('checkOut', e.target.value)}
                            className="pl-8"
                        />
                        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none md:hidden" />
                    </div>
                </div>
                {/* Guests */}
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4 flex flex-col">
                    <label htmlFor="guests" className="block text-sm font-medium ziggla-text-secondary flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        Guests
                    </label>
                    <div className="relative">
                        <select
                            id="guests"
                            value={search.guests}
                            onChange={e => handleChange('guests', e.target.value)}
                            className="w-full focus:outline-none text-lg pl-8"
                        >
                            <option value="2">2 Guests</option>
                            <option value="1">1 Guest</option>
                            <option value="3">3 Guests</option>
                            <option value="4+">4+ Guests</option>
                        </select>
                        <Users className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none md:hidden" />
                    </div>
                </div>
                {/* Search Button */}
                <div className="flex items-end">
                    <Button
                        type="submit"
                        className="gold-gradient w-full px-4 py-2 rounded-full text-white font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                        <SearchIcon className="w-5 h-5" />
                        Search
                    </Button>
                </div>
            </div>
        </form>
    )
}
