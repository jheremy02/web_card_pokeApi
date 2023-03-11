import { Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsHeartFill, BsHeart } from "react-icons/bs";

function ItemCharacter({objectPokemon,currentPage,handleClickUpdateFavorite,favorites}) {
    const [image,setImage]=useState("")
    const [types,setTypes]=useState([])
    const [isFavorite,setFavorite]=useState(false)
    const [itemPokemon,setItePokemon]=useState({})
    const [isOnfavorites,setIsOnFavorites]=useState(false)

    
    function handleClickFavorite(event) {
        setFavorite(!isFavorite)
        
        handleClickUpdateFavorite(itemPokemon,event)
    }

    function updateCheckFavorites(data) {
        
        if (favorites) {
            const isOnFavorites=favorites.some((pokemon)=>(pokemon.id===data.id))
            
            if (isOnFavorites) {

                setFavorite(true)
            } else {
                setFavorite(false)
            }
        }

        
    }


        useEffect(()=>{
            async function getData (url) {
                const response=await fetch(url)
                const dataResponse=await response.json()
        
                return dataResponse
            }
        
           
                async function  handleData () {
                    const data=await getData(objectPokemon.url)
                    setImage(data.sprites.other.home.front_default)
                    setItePokemon(data)
                    
                    setTypes(data.types)
                    updateCheckFavorites(data)
                }

                handleData()
                
        },[currentPage,objectPokemon])

     

  return (
    
<div className="w-full max-w-[12rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        </button>
        
        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-5">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg hover:scale-150 z-1" src={image} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white z-0">{objectPokemon.name}</h5>
        <span className=" flex gap-3 text-sm text-gray-500 dark:text-gray-400">{types.map((item)=>(<label>{item.type.name}</label>))}</span>
        <div className="flex w-full justify-end px-4 md:mt-8 ">
        <div class="flex justify-end ">
        <input checked={isFavorite} onClick={handleClickFavorite} id={itemPokemon.id} type="checkbox" value="" class="w-4 opacity-0 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for={itemPokemon.id}  class="ml-2 text-lg font-medium cursor-pointer text-gray-900 dark:text-gray-300">{isFavorite?<BsHeartFill className='text-blue-600'></BsHeartFill>:<BsHeart className='text-blue-600'></BsHeart>}</label>
</div>
        </div>
    </div>
</div>

  )
}



export default ItemCharacter
