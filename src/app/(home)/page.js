import HouseCard from "../components/houses/HouseCard";
import getHouses from "../data/houses/getHouses";

export default async function Home({ searchParams }) {
    const address = searchParams.address;
    const min_price = searchParams.min_price;
    const max_price = searchParams.max_price;
    const data = await getHouses(address, min_price, max_price);
    
    return (
      <div>
        <div className="h-52"></div>
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4  border-t border-slate-300 pt-8">
          {data.map(house => {
            return (
              <HouseCard key={house.id} house={house} />
            )
          }
          )}
        </div>
      </div>
    );
  }
  