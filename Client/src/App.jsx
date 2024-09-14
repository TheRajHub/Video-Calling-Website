import { useState ,useEffect,useRef} from 'react'
import socket from './Context/Client'
import './App.css'
import SVG from './SVG'
function App() {
  let remotestream1
  let localstream
  let peer
  const [state,setstate]=useState(1)

  const vid1=useRef()
  const vid2=useRef()
  const hid=useRef()
  const cut=useRef()










  useEffect(()=>{









    console.log('hiiii')

    remotestream1=new MediaStream()
    
    const p=async()=>{






      await init()





      const config={
        IceServers:[
          {
            urls:'stun:stun.l.google.com:19302'
          }
        ]
      }





      peer=new RTCPeerConnection(config)
      localstream.getTracks().forEach((track)=>{
        peer.addTrack(track,localstream)
      })
      peer.onicecandidate=(e)=>{
        if(e.candidate){
          console.log(e.candidate)
        }
      }








      peer.ontrack=(e)=>{
        hid.current.classList.remove('hidden')
        e.streams[0].getTracks().forEach((track)=>{
          remotestream1.addTrack(track)
        })
       

      }
      let offer=await peer.createOffer()
      await peer.setLocalDescription(offer)
      
      socket.emit('join')
      socket.on('isFull',(t)=>{
        console.log(t)
        if(t){
          socket.emit('offer',peer.localDescription)
        }
      })



      
      
    }
    const init=async()=>{
      localstream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
      vid1.current.srcObject=localstream
      vid2.current.srcObject=remotestream1
    }
    
    p()
  },[state])

  socket.on('offer',async(data)=>{
    console.log(`offer ${socket.id}`)
    await peer.setRemoteDescription(data)
    const answer=await peer.createAnswer()
    await peer.setLocalDescription(answer)
    socket.emit('answer',peer.localDescription)
  })
  socket.on('answer',async(data)=>{
    console.log(`answer ${socket.id}`)
    await peer.setRemoteDescription(data)
  })
  socket.on('dis',()=>{
    peer.close(); // Close the peer connection
    setstate(state^1)
    

  })
  useEffect(() => {
    cut.current.addEventListener('click', (e) => {
      socket.emit('dis'); // Corrected the typo here
      peer.close(); // Close the peer connection
      setstate(state^1)
    });
  }, []);

  



  return (
    <>
      <div className="grid-container">
      <div className="grid-item">
        <video ref={vid1} autoPlay className="webcam-video" />
        <br/>
        <br/>
        <div id='svg' ref={cut}>
          <SVG ></SVG>
        </div>
        
      </div>
      <div className="grid-item hidden" ref={hid}>
        <video ref={vid2} autoPlay className="webcam-video" />
      </div>
    </div>
      
    </>
  )
}

export default App
