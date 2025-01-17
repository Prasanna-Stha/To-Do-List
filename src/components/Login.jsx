import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { TaskContext } from "../context/Context"

const Login = () => {
    const {lightTheme, setLightTheme}=useContext(TaskContext)
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log("submitted", data)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={`w-full h-full ${lightTheme ? "":"bg-gray-900"}`}>
            <form
                className={`border rounded-md shadow-xl w-[30vw] p-4 absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 flex flex-col gap-4`}
                onSubmit={handleSubmit(onSubmit)} >
                <h1 className={`${lightTheme ? "":"text-white"} text-xl text-center font-semibold`}>Sign in to your account</h1>
                <div>
                    <label className={`${lightTheme ? "":"text-white"}`}>Username:</label>
                    <input
                        placeholder="Username"
                        type="text"
                        className="w-full h-10 pl-3 py-2 border rounded-sm border-gray-400 mt-1 outline-none focus:border-2 bg-transparent"
                        autoComplete="off"
                        {...register("userName", {
                            minLength: { value: 3, message: "Username must be at least 3 characters." },
                            maxLength: { value: 20, message: "Username must not exceed 20 characters." },
                        })}
                    />
                    {errors.userName && <span className="text-red-600 mt-1">{errors.userName.message}</span>}
                </div>

                <div>
                    <label className={`${lightTheme ? "":"text-white"}`}>Password:</label>
                    <div className="relative w-full">
                        <input
                            placeholder="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full h-10 pl-3 py-2 border rounded-sm border-gray-400 mt-1 outline-none focus:border-2 bg-transparent"
                            autoComplete="off"
                            {...register("password", {
                                minLength: { value: 6, message: "Password must be at least 6 characters." },
                                maxLength: { value: 30, message: "Password must not exceed 30 characters." },
                            })}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={`cursor-pointer ${lightTheme ? "":"text-white"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600`}
                        >
                            {showPassword ? "hide" : "show"}
                        </button>
                        {errors.password && <span className="text-red-600 mt-1">{errors.password.message}</span>}
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-centertext-sm">
                        <input type="checkbox" className="cursor-pointer mr-1" id="rememberMe" />
                        <label htmlFor="rememberMe" className={`cursor-pointer ${lightTheme ? "":"text-white"}`}>Remember me</label>
                    </div>
                    <a href="#" className="text-sm underline text-blue-700">Forgot password?</a>
                </div>

                <button type="submit" className="w-full h-10 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    SIGN IN
                </button>
            </form>
        </div>
    )
}

export default Login
