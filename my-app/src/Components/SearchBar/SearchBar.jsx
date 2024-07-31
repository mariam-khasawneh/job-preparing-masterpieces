function SearchBar({ placeholder }) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="border-2 border-[#dae4f1] rounded-lg flex p-3 items-end gap-3 bg-none w-full h-10 focus:outline-none focus:border-primaryIndigo"
      />
    </div>
  );
}

export default SearchBar;
