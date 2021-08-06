import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";

import UserContext from "../contexts/UserContext";

import logo from "../assets/images/logo-pokedex.png";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setToken } = useContext(UserContext);
    const history = useHistory();
    const api = 'https://pokeapi.co/api/v2/'
    const [p0,setP0] = useState([])
    const [p1,setP1] = useState([])
    const [p2,setP2] = useState([])
    const [pokemons,setPokemons] = useState([])
    const arr=[]
    
    
    useEffect(()=>{
        axios.get(`${api}pokemon/?offset=0&limit=2"`)
            .then((response)=>{
              const x = response.data.results
            
              setP0(response.data.results)
            })
    })

   

    function submit(event) {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, {
            email,
            password,
            confirmPassword
        }).then(res => {
           // setToken(res.data.token);
            history.push("/");
        });
        
    }

    return (
        <Page>
            <Container onSubmit={submit}>
                <img src={logo} alt="Logo" />
                <Input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <Button>Sign In</Button>
                <Link to="/login" style={{ padding: '6px' }}>Already have an account? Log In</Link>
                
                <ButtonS onClick={()=>f0()}> p0</ButtonS>
                <ButtonS onClick={()=>f1()}> p1</ButtonS>
                <ButtonS onClick={()=>f2()}> p2</ButtonS>
                <ButtonS onClick={()=>sendToDB()}> p3</ButtonS>
            </Container>
        </Page>
    );




    function f0(){
        console.log(p0)
        console.log(p1)
        console.log(p2)
        console.log(pokemons)
    }

    function f1(){
        p0.forEach( (item)=>{
            axios.get(`${item.url}`)
           .then((response)=>{
              
              const r= response.data
               const pokemon={}
               
              
               pokemon["id"]=r.id
               pokemon["name"]=r.forms[0].name
               pokemon["image"]=r.sprites.front_default
               pokemon["weight"]=r.weight
               pokemon["height"]=r.height
               pokemon["baseExp"]=r.base_experience
               pokemon["number"]=r.id
               
               arr.push(pokemon)
               setPokemons(arr)
    
           })
         })

    }

    function f2(){
        const arr=pokemons
        arr.forEach((item,index)=>{
            axios.get(`https://pokeapi.co/api/v2/characteristic/${item.id}/`)  
                           .then((res)=>{
                               
                               item["description"]=res.data.descriptions[2].description
                               


                           })
        })

        setPokemons(arr)
        
    }

    function sendToDB(){
        axios.post("http://localhost:4000/insert",pokemons)
        
    }
}

const Page = styled.div`
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    background-color: #E44141;
    display: flex;
    align-items: center;
    justify-content: center;

    
`;

const Container = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;


const ButtonS = styled.button`
width:200px;
height: 100px;
background-color: green;

`