import AllFacilitiesCard from "@/components/AllFacilitiesCard";



const AllFacilitiesPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`)
    const facilities = await res.json();
    console.log(facilities);
    return (
        <div>
            <h1>All Facilities</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                   facilities.map( facility => <AllFacilitiesCard key={facility._id} facility={facility}></AllFacilitiesCard>)
                }
            </div>
        </div>
    );
};

export default AllFacilitiesPage;