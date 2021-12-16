import { useState } from 'react';
import './TaskGiver.scss'
import firebase from '../../firebase'

const TaskGiver = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [ram, setRam] = useState('')
    const [cores, setCores] = useState('')

    let handleSubmit = (e) => {
        e.preventDefault()

        const jobRef = firebase.database().ref('jobs');
        const data = {
            name: name,
            desc: desc,
            ram_req: ram,
            cores: cores
        }

        jobRef.push(data)

        setName('')
        setRam('')
        setCores('')
        setDesc('')
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit} className="task_form">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required={true} />
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required={true} />
            <label htmlFor="ram">Ram Required</label>
            <input type="text" name="ram" value={ram} onChange={(e) => setRam(e.target.value)} required={true} />
            <label htmlFor="cores">Cores Required</label>
            <input type="text" name="cores" value={cores} onChange={(e) => setCores(e.target.value)} required={true} />
            <button>Send the Task</button>
        </form>
    );
}

export default TaskGiver;