const Search = (props) => {
  const { searchQuery, searchCity, setSearchQuery } = props;
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Город"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        onKeyPress={searchCity}
        className="search-bar"
      />
    </div>
  );
};

export default Search;
