'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useTheme } from '@/components/providers/ThemeProvider'

export function SearchForm() {
    const themeContext = useTheme()
    const theme = themeContext?.theme ?? 'light'

    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: '1'
    })

    const handleSearch = () => {
        console.log('Search data:', searchData)
        // Add search logic here
    }

    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    return (
        <div
            className={`bg-white rounded-lg p-6 shadow-2xl w-full max-w-4xl mx-auto animate-slide-up ${
                theme === 'dark' ? 'dark:bg-dark-800' : ''
            }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination */}
                <div className="space-y-2">
                    <label
                        htmlFor="destination"
                        className={`block text-sm font-medium ${
                            theme === 'dark' ? 'text-black' : 'text-gray-700'
                        }`}
                    >
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Destination
                    </label>
                    <Input
                        id="destination"
                        type="text"
                        placeholder="Where are you going?"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    />
                </div>
                
                {/* Check In */}
                <div className="space-y-2">
                    <label
                        htmlFor="check-in"
                        className={`block text-sm font-medium ${
                            theme === 'dark' ? 'text-black' : 'text-gray-700'
                        }`}
                    >
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Check In
                    </label>
                    <Input
                        id="check-in"
                        type="date"
                        value={searchData.checkIn || today}
                        onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    />
                </div>
                
                {/* Check Out */}
                <div className="space-y-2">
                    <label
                        htmlFor="check-out"
                        className={`block text-sm font-medium ${
                            theme === 'dark' ? 'text-black' : 'text-gray-700'
                        }`}
                    >
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Check Out
                    </label>
                    <Input
                        id="check-out"
                        type="date"
                        value={searchData.checkOut || tomorrow}
                        onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    />
                </div>
                
                {/* Guests */}
                <div className="space-y-2">
                    <label
                        htmlFor="guests"
                        className={`block text-sm font-medium ${
                            theme === 'dark' ? 'text-black' : 'text-gray-700'
                        }`}
                    >
                        <Users className="inline w-4 h-4 mr-1" />
                        Guests
                    </label>
                    <select
                        id="guests"
                        value={searchData.guests}
                        onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                    >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4+">4+ Guests</option>
                    </select>
                </div>
            </div>
            
            <div className="mt-6 text-center">
                <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleSearch}
                >
                    <Search className="w-5 h-5 mr-2" />
                    Search Properties
                </Button>
            </div>
        </div>
    )
}
