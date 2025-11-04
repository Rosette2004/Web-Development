// import { useState } from "react";
// import "./App.css";

// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [title, setTitle] = useState("");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!title.trim()) return;

//     const newMovie = {
//       id: Date.now(),
//       title: title.trim(),
//       comment: comment.trim(),
//       rating,
//     };

//     setMovies([...movies, newMovie]);
//     setTitle("");
//     setComment("");
//     setRating(0);
//   }

//   function handleRemove(id) {
//     setMovies(movies.filter((movie) => movie.id !== id));
//   }

//   return (
//     <main className="app">
//       <h1>🎬 Movies Watch List</h1>

//       <form className="movie-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter movie title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Add a review comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />

//         <div className="rating">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => setRating(star)}
//               className={rating >= star ? "star active" : "star"}
//             >
//               ⭐
//             </button>
//           ))}
//         </div>

//         <button type="submit" className="add-btn">
//           Add Movie
//         </button>
//       </form>

//       <section className="movie-list">
//         {movies.length === 0 ? (
//           <p>No movies added yet 🎞️</p>
//         ) : (
//           movies.map((movie) => (
//             <article className="movie-item" key={movie.id}>
//               <h3>{movie.title}</h3>
//               <p>💬 {movie.comment || "No review"}</p>
//               <p>
//                 ⭐ {movie.rating} {movie.rating === 1 ? "Star" : "Stars"}
//               </p>
//               <button
//                 onClick={() => handleRemove(movie.id)}
//                 className="remove-btn"
//               >
//                 Remove
//               </button>
//             </article>
//           ))
//         )}
//       </section>
//     </main>
//   );
// }
