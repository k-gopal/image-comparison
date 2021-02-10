import React, { useState } from 'react'

const App = () => {

  const [compareImages, setCompareImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [imageId, setImageId] = useState([]);

  fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => setImagesData(data))
        .catch(err => console.log(err))

  const addToCompare = (image) => {

    if(imageId.includes(image.id)){
      let x = [...compareImages]
      x = x.filter(item => item.id !== image.id)
      setCompareImages(x)
      let y = [...imageId]
      y = y.filter(item => item !== image.id)
      setImageId(y)
      document.getElementById(image.id).innerHTML = 'Compare'
    }else{
      setCompareImages([...compareImages, image]);
      setImageId([...imageId, image.id])
      document.getElementById(image.id).innerHTML = 'Remove'
    }

  }

  const listImages = imagesData.map(image => (
    <div className="col-4" key={image.id}>
      <div className="card" style={{padding:'10px'}}>
        <img src={image.url} alt={image.title} className='card-img-top'/>
        <h5 className="card-title"> {image.title} </h5>
        <p><b>ID:</b> {image.id} </p>
        <p> <b>Thumbnail:</b> {image.thumbnailUrl} </p>
        <button className="btn btn-sm btn-primary" type='submit' id={image.id} onClick={() => addToCompare(image)}>Compare</button>
      </div>
    </div>
  ))


  const listTable = compareImages.map(image => (
    <tr key={image.id}>
      <td> <img src={image.thumbnailUrl} alt={image.title} /> </td>
      <td> {image.id} </td>
      <td> {image.url} </td>
      <td> {image.title} </td>
    </tr>
  ))

  return (
    <div className="container" id="top">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top" style={{marginBottom:'2px'}}>
        <div className="container-fluid">
          <h5 className="navbar-brand">
            Image Comparison App
          </h5>
        </div>
        <a href="#top" className="btn btn-secondary" style={{marginRight:'3px'}}>Top</a>
        <a href="#table" className="btn btn-primary">Table</a>
      </nav>

      <div className="row mt-5" style={{marginTop:'10px'}}>
        {listImages}
      </div>

      <hr/>

      <table className="table caption-top table-success table-striped mt-3" id="table">
        <caption>Comparison table</caption>
        <thead>
          <tr>
            <th>ThumbNail</th>
            <th>ID</th>
            <th>URL</th>
            <th>TITLE</th>
          </tr>
        </thead>
        <tbody>
          {listTable}
        </tbody>
      </table>
    </div>
  )
}

export default App
