'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CardLivro from '@/components/CardLivro';
import styles from './page.module.css';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetalhado, setPokemonDetalhado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Busca a lista inicial de registros
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        setPokemons(response.data.results);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista:", error);
        setCarregando(false);
      });
  }, []);

  // Busca o registro único ao clicar
  const buscarDetalhesPokemon = (url) => {
    axios.get(url)
      .then((response) => {
        setPokemonDetalhado(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes:", error);
      });
  };

  if (carregando) return <p className={styles.carregando}>Carregando dados da API...</p>;

  return (
    <main className={styles.container}>
      

      <div className={styles.conteudo}>
        {/* Lado Esquerdo: Lista de Registros */}
        <section className={styles.lista}>
          {pokemons.map((poke) => (
            <CardLivro 
              key={poke.name} 
              livro={poke} 
              aoSelecionar={() => buscarDetalhesPokemon(poke.url)} 
            />
          ))}
        </section>

        {/* Lado Direito: Detalhes do Registro Único */}
        <section className={styles.detalhes}>
          {pokemonDetalhado ? (
            <div className={styles.painelDetalhe}>
              <h2 className={styles.nomePokemon}>{pokemonDetalhado.name}</h2>
              
              <img 
                src={pokemonDetalhado.sprites?.front_default} 
                alt={pokemonDetalhado.name}
                className={styles.fotoPokemon}
              />

              <div className={styles.infoDados}>
                <p><strong>Número:</strong> #{pokemonDetalhado.id}</p>
                <p><strong>Altura:</strong> {pokemonDetalhado.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemonDetalhado.weight / 10} kg</p>
              </div>
              
              <div className={styles.statusContainer}>
                <h3>Status de Combate:</h3>
                <ul>
                  {pokemonDetalhado.stats?.map((stat) => (
                    <li key={stat.stat.name}>
                      <span className={styles.nomeStat}>{stat.stat.name}:</span> {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className={styles.painelVazio}>
              <p>Clique em um item da lista para carregar os detalhes do registro único.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}