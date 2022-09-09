import './SearchBar.css'
const SearchBar = ({onChange})=>{
return(
    <div className="item searchBar">
        <h1>Central do Holder</h1>
        <input onChange={(e) => onChange(e.target.value)}></input>
    </div>
)
}

export default SearchBar;