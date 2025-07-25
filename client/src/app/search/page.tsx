import SearchResults from "@/components/sections/search/searchResults";
import SearchBar from "@/components/forms/search/searchBar";
const SearchPage = () => {
    return (
        <div className="m-6">
            <SearchBar />
            <SearchResults />
        </div>
    );
};

export default SearchPage;
