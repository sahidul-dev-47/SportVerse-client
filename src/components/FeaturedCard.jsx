import React from 'react';
import AllFacilitiesCard from './AllFacilitiesCard';

const FeaturedPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`)
    const facilities = await res.json()
    console.log(facilities)
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    facilities.map(facility => <AllFacilitiesCard key={facility._id} facility={facility}></AllFacilitiesCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedPage; 