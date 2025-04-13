import React from 'react'

export default function Loading() {
return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="animate-pulse">
            {/* Header */}
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-8"></div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-full"></div>
                ))}
            </div>
        </div>
    </div>
)
}