import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Movies.css"

const Movies = () => {
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/movies`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating)
        })
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/movies/${selectedId}`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating)
        })
        .then(res => {
            let singleMovie = movies.find(el=> el.id === selectedId)
            singleMovie.title = input.title
            singleMovie.description = input.description
            singleMovie.year = input.year
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            setMovies([...movies])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovies = movies.filter(el => el.id != itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovies])
      
    }
    
    const handleEdit = () =>{
      let singleMovie = movies.find(x=> x.id === itemId)
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        year: singleMovie.year,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  return(
    <>
      <h1>Daftar Peserta Lomba</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Movies Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Title:
          </label>
          <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Description:
          </label>
          <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Year:
          </label>
          <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Duration:
          </label>
          <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Rating:
          </label>
          <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <button>submit</button>
      </form>
    </>
  )
}

export default Movies