import { useContext } from 'react';
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import PokemonButton from '../components/PokemonButton';
import Footer from "../components/Footer";

import PokemonsContext from "../contexts/PokemonsContext";

export default function PokemonListPage() {
    const { pokemons } = useContext(PokemonsContext);
    const { token } = useContext(UserContext);
    return (
        <>
            <Header />

            <Container>
                {pokemons === null && "Loading..."}
                {pokemons && pokemons.length === 0 && "No Pokémon found!"}
                {pokemons && pokemons.map(p => <PokemonButton pokemon={p} key={p.name} />)}
                <button onClick={()=>console.log(token)}>aaa</button>
            </Container>

            <Footer currentPage="list" />
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 85px 0 65px;
    padding: 25px 0;
    background-color: #F2F2F2;
    min-height: calc(100vh - 150px);
    align-items: flex-start;
    align-content: flex-start;
`;
