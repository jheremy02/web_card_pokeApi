import React,{useState ,useEffect,useReducer, useMemo, useRef} from 'react'
import ItemCharacter from './ItemCharacter'
import SectionLayout from './SectionLayout'
import { Pagination} from "flowbite-react";

const initiaState={
    favorites:[]
}

const favoritesReducer=(state,action)=>{
    switch (action.type) {
        case "ADD_TO_FAVORITE":
            
            return {
                ...state ,
                favorites:[...state.favorites,action.payload]
            }
        
            case "DELETE_FAVORITE" :
            
            const favoritesUpdated=state.favorites.filter(pokemon=>(pokemon.id!==action.payload.id))
            console.log(favoritesUpdated)
            return {
                ...state,
                favorites:[...favoritesUpdated]
            }
            

        default:
            return state;
    }
}


export default function Characters() {
  
    const [characters,setCharacters]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(5);
    const  [favorites,dispatch]=useReducer(favoritesReducer,initiaState)
    const [search,setSearch]=useState('');
    const searchInput=useRef(null)


  const [data,setData]=useState({
     pokemons : [],
     pokeUrl : "https://pokeapi.co/api/v2",
     prevLink : "",
     nextLink : "",
     count : 0,
     perPage : 20,
     offSet:0
  })

function handleClickUpdateFavorite(pokemon,event){
    if (event.target.checked) {
        dispatch({type:"ADD_TO_FAVORITE",payload:pokemon})
    } else {
        dispatch({type:"DELETE_FAVORITE",payload:pokemon})
    }
    
}

function onPageChange(value) {
    
    setCurrentPage(value)
}


function handleOnChange(event){
    console.log(event.target.id)
    if (searchInput.current.id==="search"){
        setSearch(searchInput.current.value)
        if (searchInput.current.value==='') {
        setCurrentPage(1)
        handledata()
        }
    }
    
}


async function handleSubmit(event){
    event.preventDefault()
    
    const searchInput=event.target.querySelector("#search").value

    const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)

    const pokemon=await response.json() ;

    const dataPokemon={name:pokemon.name,url:`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`}
    setCharacters([dataPokemon])
    setData({...data,count:20})
    
}

/**
 const filteredPokemons=characters.filter((pokemon)=>{
    return pokemon.name.toLowerCase().includes(search.toLowerCase())
})
 */

const filteredPokemons=useMemo(()=>
    characters.filter((pokemon)=>{
        return pokemon.name.toLowerCase().includes(search.toLowerCase())
    })
,[characters])

async function handledata() {
    const dataResponse=await getData(`${data.pokeUrl}/pokemon?offset=${(Number(currentPage)-1)*data.perPage}&limit=${data.perPage}`)
    setData({...data,count:dataResponse.count})
    setCharacters(dataResponse.results)
    
}

async function getData(url){
    const response=await fetch(url)
    const data= await response.json()
    
    return data
}

    useEffect(()=>{
    
        handledata()

    },[currentPage])
  
  
    return (

        <SectionLayout>
             <div className='flex flex-col items-center'>
             
<form onSubmit={handleSubmit}>   
    <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required value={search} ref={searchInput} onChange={handleOnChange}/>

        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

             <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Pagination currentPage={currentPage} totalPages={Number(data.count)/20} onPageChange={onPageChange }  />
        </div>
        <div className="flex mb-9 -space-x-4 ">
        {favorites.favorites.map((favorite)=>(<img className="w-14 h-14 border-2 border-white rounded-full dark:border-gray-800" src={favorite.sprites.other.home.front_default} alt=""/>))}
</div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        <div className='flex flex-wrap gap-4 justify-center'>
            {filteredPokemons.map((item ,index)=>(
                <ItemCharacter objectPokemon={item} index={index} currentPage={currentPage} handleClickUpdateFavorite={handleClickUpdateFavorite} favorites={favorites.favorites}></ItemCharacter>
            ))}
        </div>
        </div>
        </div>
        </SectionLayout>

   
  )
}
