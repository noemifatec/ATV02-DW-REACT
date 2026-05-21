import styles from './CardLivro.module.css';

export default function CardLivro({ livro, aoSelecionar }) {
  return (
   
    <div className={styles.card} onClick={aoSelecionar}>
      <h3 style={{ textTransform: 'capitalize' }}>{livro.name}</h3>
      <p>Clique para ver os status básicos</p>
      <span className={styles.Grupo}>Ver mais</span>
    </div>
  );
}