import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} - Desenvolvido por [Noemi] — Fatec Registro</p>
      <p>Desenvolvimento Web III - Atividade 02 - Consumo de API</p>
    </footer>
  );
}