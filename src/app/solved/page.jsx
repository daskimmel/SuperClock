import styles from "./page.css"

export default function Solved() {

  return (
    <>
      <div className="solved-container">
        <div className="line-1 anim-typewriter">
            You solved the puzzle.
        </div>
      </div>
      <div className="video-container fadein">
        <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </>
  )
}
