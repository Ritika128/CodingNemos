import React from "react";
import './grid.css'
import Header from './header.js';

//new 
const books =[
{ id : 1,
  // img: "https://m.media-amazon.com/images/I/8144Vic9C5L._SY522_.jpg" ,
  img: `${process.env.PUBLIC_URL}/gallery/pic1.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp1.png`,
  title: 'THE FUTURE GIRL',
  author: 'Gina Lenetti',
  price: '$4.05'
},

{ id : 2,
  // img: "https://m.media-amazon.com/images/I/51PRQuO-xjL._SX342_SY445_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic2.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp3.png`,
  title: 'SPIRIT ANIMAL',
  author: 'Jack Rossner',
  price: '$1.30'
},

{ id : 3,
  // img: "https://m.media-amazon.com/images/I/51i8VUx2ztL._SX342_SY445_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic3.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp2.png`,
  title: 'THE COOLS',
  author: 'Phil Dunphy',
  price: '$3.66'
},

{ id : 4,
  // img: "https://m.media-amazon.com/images/I/51IEuXdYRhL._SX342_SY445_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic4.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp4.png`,
  title: 'MULK',
  author: 'Bruce Banner',
  price: '$4.24'
},

{ id : 5,
  // img: "https://m.media-amazon.com/images/I/51amEygdqQL._SX342_SY445_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic5.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp5.png`,
  title: "BOSS BABY",
  author: 'Aryan Dey',
  price: '$4.98'
},

{ id : 6,
  // img: "https://m.media-amazon.com/images/I/91HHxxtA1wL._SY522_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic6.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp6.png`,
  title: 'ROBO',
  author: 'Tony Stark',
  price: '$9.40'
},

{ id : 7,
  // img: "https://m.media-amazon.com/images/I/51epJM8qsCL._SX342_SY445_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic7.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp7.png`,
  title: 'GEN-Z',
  author: 'Georgia Miller',
  price: '$6.21'
},

{ id : 8,
  // img: "https://m.media-amazon.com/images/I/91QLt2Q-+cL._SY522_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic8.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp8.png`,
  title: 'EMPTY INSIDE',
  author: 'Trent Travis',
  price: '$6.25'
},

{ id : 9,
  // img: "https://m.media-amazon.com/images/I/91mv453UIVL._SY522_.jpg",
  img: `${process.env.PUBLIC_URL}/gallery/pic9.png`,
  pp : `${process.env.PUBLIC_URL}/gallery/pp9.png`,
  title: 'LEO',
  author: 'Senora',
  price: '$6.77'
},
];

//
const BookList = () => {

  return  (
        <div> 
        <Header />
        <section className="booklist">
            {books.map((book, index) => {
            return <Book key={book.id} book={book}></Book>
        })}
        </section>
        </div>
  );
}

const Book = (props) => {
    const {img, pp, title, author, price} = props.book;
    const clickHandler = () =>{
      alert('bid placed succesfully')
      alert('added to cart')
    }
    return (
        <article className='book' onMouseOver={() => { console.log(title); }}>
            <div className="book-container">
            <div className="profile-circle">
              <div className="profile-image" style={{ backgroundImage: `url('${pp}')` }}></div>
             
            </div>
                <img src={img} alt='' />
                <h1 onClick={() => console.log(title)}>{title}</h1>
                <h4>{author}</h4>
                <article>{price}</article>
                <button type="button" onClick={clickHandler}>
                    Buy Now
                </button>
            </div>
        </article>
  );
};

export default BookList;
