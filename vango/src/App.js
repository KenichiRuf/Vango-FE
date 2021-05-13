import './App.css';
import React, { useState } from 'react';
import { PickerOverlay } from 'filestack-react';
import deepai from 'deepai';
import { Button, Modal } from 'reactstrap';
import Transfer from './components/Transfer';
import 'bootstrap/dist/css/bootstrap.min.css';

deepai.setApiKey('8975ebce-f2b8-48ba-ad29-551737b57208');

function App() {

  const [content, setContent] = useState(null)
  const [style, setStyle] = useState(null)
  const [contentModal, setContentModal] = useState(false)
  const [styleModal, setStyleModal] = useState(false)
  const [transfers, setTransfers] = useState([])

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

  const toggleContentModal = () => setContentModal(!contentModal)
  const toggleStyleModal = () => setStyleModal(!styleModal)

  return (
    <div className="App">
      <h1>Vango</h1>
      <p>Easy Image Style Transfer</p>
      {style && content ? <Button onClick={() => transferStyle()}>Transfer Style</Button> : null}
      <span>
        {content ? <img src={content} width={500} alt={content}/> : <Button onClick={() => setContentModal(true)}>Choose Image</Button>}
      </span>
      <span>
        {style ? <img src={style} width={500} alt={style}/> : <Button onClick={() => setStyleModal(true)}>Choose Style Image</Button>}
      </span>
      <div className="transfer-list">
        {transfers.map(transfer =>
          <Transfer
            content={transfer.content}
            style={transfer.style}
            image={transfer.image}
          />
        )}
      </div>
      <Modal isOpen={contentModal} toggle={toggleContentModal} size={"lg"}>
        <PickerOverlay
          apikey={"ALAz14stfTNaofPLLgWUlz"}
          onSuccess={(res) => {
            setContent(res.filesUploaded[0].url)
            setContentModal(false)
          }}
        />
      </Modal>
      <Modal isOpen={styleModal} toggle={toggleStyleModal}>
        <PickerOverlay
          apikey={"ALAz14stfTNaofPLLgWUlz"}
          onSuccess={(res) => {
            setStyle(res.filesUploaded[0].url)
            setStyleModal(false)
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
