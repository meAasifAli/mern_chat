import { useState } from "react";
import { Link } from "react-router-dom";
import { userAuthprovider } from "../../context/AuthContext";
import toast from 'react-hot-toast'
import GenderCheckBox from "./GenderCheckBox";
import axios from 'axios'
const Signup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = userAuthprovider()
    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        password: "",
        gender: ""
    });
    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };
    const handleSignup = async (ev) => {
        setLoading(true)
        ev.preventDefault()
        try {
            const res = await axios.post("http://localhost:9000/api/auth/signup", {
                username: inputs.username,
                fullname: inputs.fullname,
                password: inputs.password,
                gender: inputs.gender
            })

            if (res?.status === 201) {
                localStorage?.setItem("authUser", JSON.stringify(res?.data))
                setAuthUser(res?.data)
            }


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                duration: 3000,
                position: "top-center"
            })
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered  h-10'
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link
                        to={"/login"}
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
                        href='#'
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "signup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup