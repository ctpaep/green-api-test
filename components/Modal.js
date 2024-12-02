"use client";

const Modal = ({ onClose }) => {

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name').trim();
        let phone = formData.get('phone');
        phone = phone.replace(/[^0-9]/g, '');
        phone += '@c.us';
    
        // Валидация номера телефона
        //Лучше использовать библиотеку для валидации, но я не буду пока ее сюда затаскивать
    
        const data = { time: Date.now(), name, phone };
    
        try {
            let storedData = localStorage.getItem('chats');
            let parsedData = [];
    
            if (storedData) {
                parsedData = JSON.parse(storedData);
            }
    
            parsedData.push(data);
            localStorage.setItem('chats', JSON.stringify(parsedData));
            console.log('Данные успешно сохранены:', parsedData);
            event.target.reset(); 
    
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            alert('Ошибка при сохранении данных. Попробуйте ещё раз.');
        }
        onClose(); 
    };
    
    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-content">
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <form onSubmit={onSubmit} className="space-y-6 p-6">
                    <label className="block text-sm/6 font-medium text-gray-900">
                        NickName:
                        <input type="text" name="name" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                    </label>
                    <label className="block text-sm/6 font-medium text-gray-900">
                        Phone:
                        <div className='flex justify-center'>
                        <input type="text" name="phone" placeholder='+7 912 867-65-66' className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                        </div>
                    </label>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                        Add Chat
                    </button>
                </form>
            </div>
            <div className='modal-backdrop' />
        </div>
    )
}

export default Modal