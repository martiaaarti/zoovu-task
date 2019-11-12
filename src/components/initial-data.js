import Z from '../img/z_letter.png';
import O from '../img/o_letter.png';
import O2 from '../img/o2_letter.png';
import V from '../img/v_letter.png';
import U from '../img/u_letter.png';


function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  export const zoovuLogoCards = [
  { id: 1, img: Z },
  { id: 2, img: O },
  { id: 3, img: O2 },
  { id: 4, img: V },
  { id: 5, img: U }
]

export const initialData = shuffleArray(zoovuLogoCards);


