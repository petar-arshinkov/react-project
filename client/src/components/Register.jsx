import { Link } from "react-router"
import { useNavigate } from "react-router";
import useForm from "../hooks/useForm.js";
import AuthContext from "../contexts/useContext.js";
import { use } from "react";

export default function Register() {
    const navigate = useNavigate();
    const {registerHandler} = use(AuthContext);

    const registerSubmitHandler = async (values) => {
        const { email, password, 're-password': rePassword } = values;

        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        try {
            await registerHandler(email, password);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }




    }

    const {
        formAction,
        changeHandler,
        values
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        're-password': ''
    })

    return (
        <>
            {/* // Centering wrapper */}
            <div className="flex min-h-screen items-start justify-center bg-gray-100 p-4 sm:p-6">
                <div className="mt-8 w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-2xl">

                    {/* Header */}
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-indigo-600">
                            Register your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                login to your existing account
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="mt-8 space-y-6" action={formAction} >
                        <div className="rounded-md shadow-sm -space-y-px">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={changeHandler}
                                    value={values.email}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                    value={values.password}
                                />
                            </div>


                            <label htmlFor="re-password" className="sr-only">
                                Repeat Password
                            </label>
                            <input
                                id="re-password"
                                name="re-password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Type the password again"
                                onChange={changeHandler}
                                value={values['re-password']}
                            />
                        </div>





                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}