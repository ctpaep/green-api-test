import { useRef, useState } from 'react';
import './chats.css';
import { useAuth } from './context/AuthContext';
const Auth = () => {
    const { save } = useAuth();
    const errorRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [apiData, setApiData] = useState();
    const handleForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const idInstance = formData.get('idInstance');
        const apiTokenInstance = formData.get('apiTokenInstance');
        setApiData({ idInstance: idInstance, apiTokenInstance });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValidIdInstance = !isNaN(apiData.idInstance) && apiData.idInstance !== "";
        const isValidApiTokenInstance = /^[a-zA-Z0-9]+$/.test(apiData.apiTokenInstance);
        if (isValidIdInstance && isValidApiTokenInstance) {
            save(apiData)
        } else {
            setIsError(true);
            errorRef.current.style.display = 'block';
        }
    }
    return (
        <div className="container mx-auto app">
            <div className="content-center sm:mx-auto sm:w-full sm:max-w-sm h-full">
                <form onChange={handleForm} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            idInstance
                        </label>
                        <div className="mt-2">
                            <input
                                id="idInstance"
                                name="idInstance"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            apiTokenInstance
                        </label>
                        <div className="mt-2">
                            <input
                                id="apiTokenInstance"
                                name="apiTokenInstance"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        >
                            Save
                        </button>
                    </div>
                    <div className='min-h-8'>
                        <div ref={errorRef} style={{ display: 'none', color: 'red' }}>
                            Неверные данные. Проверьте idInstance и apiTokenInstance.
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default Auth