import { Cursor, useTypewriter } from "react-simple-typewriter";


const NavTypewriter = () => {
    const [text] = useTypewriter({
        words: ['HSTU Buss Shedule'],
        loop: 2
      })

      return (
        <div className='App'>
          <span>{text}</span>

        </div>
      )
};

export default NavTypewriter;