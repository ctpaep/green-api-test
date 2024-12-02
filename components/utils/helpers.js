export function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


  if (diffDays === 0) {
    // Сегодня
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (diffDays === 1) {
    // Вчера
    return "Вчера";
  } else {
    // Другая дата
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

export function getTimeFromTimestamp(timestampInSeconds) {
  const date = new Date(timestampInSeconds * 1000); // умножаем на 1000, чтобы получить миллисекунды
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function findChatByPhone(phoneNumber) {
  try {
    const chatsJSON = localStorage.getItem('chats');
    if (!chatsJSON) {
      return false;
    }
    const chats = JSON.parse(chatsJSON);

    // Проверка на валидность данных
    if (!Array.isArray(chats)) {
      console.error("Данные в localStorage не являются массивом.");
      return false;
    }


    for (const chat of chats) {
      if (chat.phone === phoneNumber) {
        return chat.phone;
      }
    }

    return false;

  } catch (error) {
    console.error('Ошибка при поиске чата:', error);
    return null;
  }
}
