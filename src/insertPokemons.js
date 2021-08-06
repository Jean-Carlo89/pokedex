import axios from 'axios'


const api = 'https://pokeapi.co/api/v2/'

  let pokemons = [] 

  




export default async function getPokemons(){
 
    try{
      const pokemons = await axios.get(`${api}pokemon?limit=20&offset=0"`)
       //console.log(pokemons.data.results)


        array2(pokemons)
    //    pokemons.data.results.array.forEach(item => {
           
    //    });
      
   
    }catch(err){
       console.log(err)
   }
   
       
   }

   async function array2(params) {
    //    console.log('params')
    //    console.log(params.data.results)

      const pokeInfo= await Promise.all(
        params.data.results.map(async (item)=>{
            return(
           await  axios.get(`${item.url}`)
            ) 
        })
      ) 

      pokeInfo.forEach((item)=>{
        //  console.log(item.data.sprites.front_default)


            const pokemon={}
        
            pokemon["id"]=item.data.id
            pokemon["name"]=item.data.name
            pokemon["number"]=item.data.id
            pokemon["image"]=item.data.sprites.front_default
            pokemon["weight"]=item.data.weight
            pokemon["height"]=item.data.height
            pokemon["baseExp"]=item.data.base_experience

            pokemons.push(pokemon)
      })

     // console.log(pokemons)

      const descriptions = await Promise.all(
        pokemons.map(async (item)=>{
            return(
               await axios.get(`https://pokeapi.co/api/v2/characteristic/${item.id}/`)
            )   
             
    
          })
        )

        descriptions.forEach((item,index)=>{
           // console.log(item.data.descriptions[item.data.descriptions.length-1])

            pokemons[`${index}`]["description"]=item.data.descriptions[item.data.descriptions.length-1].description
        })

       
        
        
            insertPokemons(pokemons)
      
   }
   
   

async function insertPokemons(pokemons) {
     
//    await Promise.all(
//         pokemons.forEach(async (item)=>{
//             getRepository(Pokemon).insert({})
//        })
//     )
console.log(' asaasasass')
    console.log(pokemons)

    // for(let i=0;i<pokemons.length; i++){

    //     await getRepository(Pokemon).insert(pokemons[i])
    //    }
    console.log(pokemons)
    axios.post(`${REACT_APP_API_BASE_URL}/insert`,pokemons)


    
    
}