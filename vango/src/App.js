import './App.css';
import React, { useState } from 'react';
import { PickerInline } from 'filestack-react';
import deepai from 'deepai';
import { Button } from 'reactstrap';
import Transfer from './components/Transfer';
import 'bootstrap/dist/css/bootstrap.min.css';

deepai.setApiKey(process.env.REACT_APP_DEEPAIKEY);

function App() {

  const [content, setContent] = useState(null)
  const [style, setStyle] = useState(null)
  const [contentModal, setContentModal] = useState(false)
  const [styleModal, setStyleModal] = useState(false)
  const [transfers, setTransfers] = useState([])
  const [imageList, setImageList] = useState([])

  const transferStyle = async () => {
    var res = await deepai.callStandardApi("fast-style-transfer", {
      content: content,
      style: style
    })
    setTransfers([{
      image: res.output_url,
      content: content,
      style: style
    }, ...transfers])
    setContent(null)
    setStyle(null)
  }

  return (
    <div className="App">
      <h1>Vango</h1>
      <p>Easy Image Style Transfer</p>
      <div>
        <span>
          {content ? <img src={content} width={500} alt={content}/> : <Button onClick={() => setContentModal(true)}>Choose Image</Button>}
        </span>
        <span>
          {style ? <img src={style} width={500} alt={style}/> : <Button onClick={() => setStyleModal(true)}>Choose Style Image</Button>}
        </span>
      </div>
      {style && content ? <Button onClick={() => transferStyle()}>Transfer Style</Button> : null}
      <div style={contentModal ? {} : {display: "none"}}>
        <PickerInline
          apikey={process.env.REACT_APP_FILESTACKKEY}
          onSuccess={(res) => {
            setContent(res.filesUploaded[0].url)
            setImageList([...imageList, res.filesUploaded[0].url])
            setContentModal(false)
          }}
        />
      </div>
      <div style={styleModal ? {} : {display: "none"}}>
        <PickerInline
          apikey={process.env.REACT_APP_FILESTACKKEY}
          onSuccess={(res) => {
            setStyle(res.filesUploaded[0].url)
            setImageList([...imageList, res.filesUploaded[0].url])
            setStyleModal(false)
          }}
        />
      </div>
      <div className="transfer-list">
        {transfers.map(transfer =>
          <Transfer
            content={transfer.content}
            style={transfer.style}
            image={transfer.image}
          />
        )}
      </div>
    </div>
  );
}

export default App;
