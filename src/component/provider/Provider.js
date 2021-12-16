import { useEffect, useRef, useState } from 'react'
import './Provider.scss';
import firebase from '../../firebase'
import TaskGiver from '../TaskGiver/TaskGiver';
import Chart from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import tick from '../../data/tick.mp4'

const Provider = () => {
   const [jobs, setJobs] = useState(null);
   const [ram, setRam] = useState('')
   const [os, setOs] = useState('')
   const [cores, setCores] = useState('4')
   const [isStarted, setIsStarted] = useState(false)
   const [bitcoin, setBitcoin] = useState(0);
   const [isOk, setIsOk] = useState(false)
   const [intervalID, setIntervalID] = useState(null)
   const [amount, setAmount] = useState(0)
   const [showRedeem, setShowRedeem] = useState(false)
   const [showTaskGiver, setShowTaskGiver] = useState(false)
   const [showAnim, setShowAnim] = useState(false)
   const [showHistory, setShowHistory] = useState(false)
   const [trans, setTrans] = useState(null)

   const active1 = useRef(null);
   const active2 = useRef(null);

   let getOS = () => {
      if (navigator.userAgent.indexOf("Win") !== -1) return "Windows OS";
      if (navigator.userAgent.indexOf("Mac") !== -1) return "Mac OS";
      if (navigator.userAgent.indexOf("Linux") !== -1) return "Linux OS";
      if (navigator.userAgent.indexOf("Android") !== -1) return "Android OS";
      if (navigator.userAgent.indexOf("like Mac") !== -1) return "iOS";
   }


   useEffect(() => {
      let jobRef = firebase.database().ref('jobs')
      jobRef.on('value', (snapshot) => {
         let obj = snapshot.val()
         let tmpArray = []
         for (let id in obj) {
            tmpArray.push({id, ...obj[id]})
         }
         setJobs(tmpArray.reverse())

      })


      let transRef = firebase.database().ref('trans')
      transRef.on('value', (snapshot) => {
         let obj = snapshot.val()
         let tmpArray = []
         for (let id in obj) {
            tmpArray.push({id, ...obj[id]})
         }
         setTrans(tmpArray.reverse())

      })
      setOs(getOS())
   }, [])

   let onLogout = () => {
      firebase.auth().signOut().then(() => {
         window.location.replace("http://localhost:3000/login");
      }).catch((error) => {
         console.log('Error in signing out');
      });
   }




   let handleStart = () => {
      let ok = false;
      let num = null;
      for (let i = 0; i < jobs.length; i++) {
         if (ram >= jobs[i].ram_req && cores >= jobs[i].cores) {
            ok = true;
            num = jobs[i].id;
            alert('Job Assigned : ' + jobs[i].name)
            break;
         }
      }

      if (ok) {
         setIsOk(true);
         let jobRef = firebase.database().ref('jobs').child(num)
         jobRef.remove()
         setIsStarted(true)
         let id = setInterval(() => {
            setBitcoin(x => (x + 0.000001).toFixed(6) * 1)
         }, 200);
         console.log(id);
         setIntervalID(id);
      } else {
         alert('Incompatible system !!')
      }
   }

   let handleStop = () => {
      setIsStarted(false)
      clearInterval(intervalID)
      setIntervalID(null);
      setIsOk(false)
   }

   let handleSubmit = (e) => {
      e.preventDefault()

   }

   let handleRedeemSubmit = (e) => {
      e.preventDefault()
      if (amount === 0) { alert('amount cannot be 0') }
      else if (amount > bitcoin) { alert('Not enough balance') }
      else {
         let tranRef = firebase.database().ref('trans');
         let data = {
            amount: amount,
            time: (new Date()).toLocaleString()
         }

         tranRef.push(data)
         setShowAnim(true)
         setTimeout(() => {
            setShowAnim(false)
            setShowRedeem(x => !x)

            setBitcoin(x => (x - amount).toFixed(6) * 1)
         }, 1000);

      }
   }

   let handleActive = (e) => {
      if (e.target.getAttribute('value') === 'taskgiver') {
         active1.current.className = 'item active'
         active2.current.className = 'item'
         setShowTaskGiver(true)
      } else {
         active2.current.className = 'item active'
         active1.current.className = 'item'
         setShowTaskGiver(false)
      }
   }

   let handleCores = (e) => {
      if (e.target.value > 4) {
         alert('Cannot set more than system resource ( 4 cores ).')
      } else {
         setCores(e.target.value)
      }
   }

   return (
      <div className="provider">
         <div className="nav">
            <span ref={active2} className="item active" value="provider" onClick={handleActive}>Resource Provider</span>
            <span ref={active1} className="item" value="taskgiver" onClick={handleActive}>Task Giver</span>
            <div onClick={onLogout} className="sign_out">Sign out</div>
         </div>
         {!showTaskGiver ? <>
            <div className="c1">
               <div className="money">
                  <div className="heading">
                     Wallet
                  </div><br></br>
                  <button onClick={() => setShowHistory(x => !x)}>History</button>
                  <button onClick={() => setShowRedeem(x => !x)}>Redeem</button>
                  <div className="coin">
                     {bitcoin}
                  </div>
               </div>

               <div className="system_info">

                  <form onSubmit={handleSubmit} >
                     <label htmlFor="ram">Ram</label>
                     <input type="text" name="ram" value={ram} onChange={e => setRam(e.target.value)} required={true} disabled={isOk} />
                     <label htmlFor="cores">Cores</label>
                     <input type="text" name="cores" value={cores} onChange={handleCores} required={true} disabled={isOk} />
                     {!isStarted
                        ? <>
                           <button onClick={handleStart}>Give Resources</button>
                        </>
                        : <>
                           <button onClick={handleStop}>Stop</button>
                        </>
                     }
                  </form>
                  {os && <p className="text1">NOTE: &nbsp; You are using {os}</p>}
               </div>
            </div>


            {showRedeem && (
               <div className="modal">
                  <div className="overlay" onClick={() => setShowRedeem(x => !x)} />


                  <div className="box">
                     <div className="close" onClick={() => setShowRedeem(x => !x)}>
                        <FontAwesomeIcon icon={faTimes} />
                     </div>

                     {showAnim ? <>
                        <video src={tick} autoPlay={true} loop={false} muted={true} />
                        <div className="heading">
                           Successfully Placed Order
                        </div>
                     </> :
                        <>
                           <div className="heading">
                              Redeem Your Credits
                           </div>

                           <div className="input">
                              <input id="input" type="text" value={amount} placeholder="Enter Amount" onChange={e => setAmount(e.target.value)} />
                           </div>
                           <div className="create">
                              <button onClick={handleRedeemSubmit}>Redeem</button>
                           </div>
                        </>}

                  </div>
               </div>
            )}

            {showHistory && (
               <div className="modal">
                  <div className="overlay" onClick={() => setShowHistory(x => !x)} />


                  <div className="box1">
                     <div className="close" onClick={() => setShowHistory(x => !x)}>
                        <FontAwesomeIcon icon={faTimes} />
                     </div>

                     <div className="heading">
                        History
                     </div>
                     {trans ?
                        <>
                           <div className="trans">
                              {trans.map((tran) => {
                                 return <div className="tran" key={tran.id}>
                                    <span>Amount : </span>{tran.amount}<br />
                                    <span>Time : </span>{tran.time}
                                 </div>
                              })}

                           </div>
                        </>
                        :
                        <>
                           <p>No Transaction to display</p>
                        </>}
                  </div>
               </div>
            )}

            <div className="jobs">
               {jobs && jobs.map((job) => {
                  return <div className="job" key={job.id}>
                     <span>{job.name} : </span>{job.desc}<br /><br />
                     <span>Ram Required : </span>{job.ram_req} &nbsp;&nbsp;
                     <span>Cores Required : </span>{job.cores}
                  </div>
               })}

            </div>
            <div className="chart">
               <Chart isHigh={isStarted} cores={cores} />

            </div>
         </> : <TaskGiver />}
      </div>
   );
}

export default Provider;
