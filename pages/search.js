import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from 'date-fns';
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";


const Search = ({ searchResults }) => {
    const router = useRouter();
    const {location, startDate, endDate, noOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
                <main className="flex"> 
                    <section className="flex-grow pt-14 px-6">
                        <p className="text-xs">{searchResults.length} Stays for - {range} - {noOfGuests} number of guests</p>
                        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                        <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                            <p className="button">Cancellation Flexibility</p>
                            <p className="button">Type of Place</p>
                            <p className="button">Price</p>
                            <p className="button">Rooms and Beds</p>
                            <p className="button">More filters</p>
                        </div>
                        <div className="flex flex-col">
                        {searchResults?.map((item) =>(
                            <InfoCard key={item.img} img={item.img} location={item.location} title={item.title} description={item.description} star={item.star} price={item.price} total={item.total} />
                        ))}
                        </div>
                    </section>

                    <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults} />
                    </section>
                </main>
            <Footer />
        </div>
    )
}

export default Search;

export async function getServerSideProps(context) {
    const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());

    return {
        props: {
            searchResults
        }
    }
}