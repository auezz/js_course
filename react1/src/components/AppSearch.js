import './AppSearch.css';
function AppSearch(props){
    const { value, onValueChange} = props;
    return(
        <div className="app-search">
                <input 
                    type="text" 
                    className="app-search-input" 
                    placeholder='search'
                    value={value}
                    onChange={(event) => {onValueChange(event.target.value)}}
                />
            </div>
    );
}

export default AppSearch;