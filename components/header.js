import styles from './header.module.css'

export default function Header({ title, sub, showImage }) {
  return (
    <header>
      <h1 className={styles.title} >
        { title }
      </h1>
      <p className={styles.sub}> { sub }</p>
      { showImage  && 
        <img src="/jpeg.jpeg" alt="It me" height="160" width="160" />
      }
    </header>
  )
}
