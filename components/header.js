export default function Header({ title, sub, showImage }) {
  return (
    <header>
      <h1 className="font-black text-5xl" >
        { title }
      </h1>
      <p className="text-2xl font-thin mb-8"> { sub }</p>
      { showImage  && 
        <img src="/jpeg.jpeg" alt="It me" height="160" width="160" />
      }
    </header>
  )
}
