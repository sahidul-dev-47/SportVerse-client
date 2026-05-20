import AllFacilitiesCard from "@/components/AllFacilitiesCard";

const AllFacilitiesPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`);
  const facilities = await res.json();
  console.log(facilities);
  return (
    <div>
      <div className="mt-10 mb-10 text-center">
        <h1 className="text-3xl font-bold  ">
          All <span className=" text-sky-500">Facilities</span>{" "}
        </h1>
        <p className="text-muted">
          Get your sports venue live on the platform in this all facilities
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <AllFacilitiesCard
            key={facility._id}
            facility={facility}
          ></AllFacilitiesCard>
        ))}
      </div>
    </div>
  );
};

export default AllFacilitiesPage;
