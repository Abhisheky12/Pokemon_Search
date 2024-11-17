import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./Pokemon cards";
export const Pokemon=()=>{
    const API="https://pokeapi.co/api/v2/pokemon?limit=24";
    const[pokemon,setPokemon]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[search,setSearch]=useState("");
    
    const fetchPokemo=async()=>{
       try {
           const res=await fetch(API);
           const data=await res.json();
        //    console.log(data);

         const detailedPokemondata=data.results.map(async(curPokemon)=>{
         const res=await fetch(curPokemon.url);
         const data=await res.json();
        //  console.log(data);
        return data;
    });
        const detailedResponses=await Promise.all(detailedPokemondata);
        console.log(detailedResponses);  
        setPokemon(detailedResponses);
        setLoading(false);
         

       } catch (error) {
        // console.log(error);
        setLoading(false);
        setError(error);
       }
    }

     useEffect(()=>{
        fetchPokemo();
     },[])

     //search
         const searchData=pokemon.filter((curPokemon)=>
            curPokemon.name.toLowerCase().includes(search.toLowerCase())
        );





     if(loading){
        return(<div>
            <h1>Loading..</h1>
        </div>
        );
     }
     if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        );
     }
        
    return(
        <>
        <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
              {
                searchData.map((curPokemon)=>{
                    return (
                    // <li key={curPokemon.id}>{curPokemon.height}</li>
                    <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                );
                }
              )}
          </ul>
        </div>
      </section>
        
        </>
    );

}