import React, {useState, useEffect} from "react"
import axios from "axios"


const Games = () => {
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    genre: "",
    platform: 2020,
    release: 120,
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (games === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            platform: el.platform,
            release: el.release
          }
        }))
      })
    }
  }, [games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "platform":
        {
          setInput({...input, platform: event.target.value});
            break
        }
      case "release":
      {
        setInput({...input, release: event.target.value});
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
        axios.post(`https://backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre,
          platfrom: input.platform,
          release: parseInt(input.release)
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/games/${selectedId}`, {
            name: input.name,
            genre: input.genre,
            platfrom: input.platform,
            release: parseInt(input.release)
        })
        .then(res => {
            let singleGames = games.find(el=> el.id === selectedId)
            singleGames.name = input.name
            singleGames.genre = input.genre
            singleGames.platform = input.platform
            singleGames.release = input.release
            setGames([...games])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        genre: "",
        platfrom: "",
        release: 0
      })
    }

  }

  const Action = ({ID_GAMES}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id != ID_GAMES)
  
      axios.delete(`https://backendexample.sanbersy.com/api/games/{ID_GAMES}`)
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGames = games.find(x=> x.id === ID_GAMES)
      setInput({
        name: singleGames.name,
        genre: singleGames.genre,
        platform: singleGames.platform,
        release: singleGames.release
      })
      setSelectedId(ID_GAMES)
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
      <h1>Daftar Games</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.platfrom}</td>
                    <td>{item.release}</td>
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
      <h1>Games Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
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
            Platform:
          </label>
          <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Release:
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

export default Games