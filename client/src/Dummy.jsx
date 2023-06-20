import React, { useState } from 'react'
import API from './redux/api'
import { toast } from 'react-toastify'

const Dummy = () => {
    const [dummyData, setDummyData] = useState({
        name: "john",
        profile: "",
        preview: ""
    })
    const handleChange = e => {
        const imageURL = URL.createObjectURL(e.target.files[0])
        setDummyData({
            ...dummyData,
            preview: imageURL,
            profile: e.target.files[0]
        })

    }
    const handleAddProfile = async e => {
        try {
            const fd = new FormData()
            fd.append("name", dummyData.name)
            fd.append("profile", dummyData.profile)

            const { data } = await API.post("/dummy", fd)
            console.log(data);
            toast.success("profile created successfully")
        } catch (error) {
            toast.error(error.message || JSON.stringify(error))
            console.log(error)
        }
    }
    return <>
        <pre>{JSON.stringify(dummyData, null, 2)}</pre>
        <input
            value={dummyData.name}
            onChange={e => setDummyData({
                ...dummyData,
                name: e.target.value
            })}
            type="text"
            placeholder='enter name' /> <br />
        <input onChange={handleChange} type="file" /> <br />
        <img src={dummyData.preview} alt="" />
        <br />
        <button onClick={handleAddProfile}>add</button>

    </>

}

export default Dummy