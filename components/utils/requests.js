const API_URL = "https://1103.api.green-api.com"
const settings = {
    idInstance: null,
    apiTokenInstance: null,
}

export const setSettings = (idInstance, apiTokenInstance) => {
   settings.idInstance = idInstance;
   settings.apiTokenInstance = apiTokenInstance;
}

export const setSettingsIntoLocalStorage = (data) => {
   localStorage.setItem('api', JSON.stringify(data));

}



export const getSettingsFromLocalStorage = () => {
   if (typeof window === "undefined") {
      return null;
    }
  const storedApiData = localStorage.getItem('api');
  if (storedApiData) {
    return JSON.parse(storedApiData);
  } else {
    return null;
  }
}

// const settings = getSettingsFromLocalStorage();

// if (!settings) {
//   throw new Error('Settings not found in localStorage');
// }


export const getHistoryMessages = async () => {
    const resIncoming = await fetch(`${API_URL}/waInstance${settings.idInstance}/lastIncomingMessages/${settings.apiTokenInstance}?minutes=1440`)
    const dataIncomin =  await resIncoming.json()

    const resOutgoing = await fetch(`${API_URL}/waInstance${settings.idInstance}/lastOutgoingMessages/${settings.apiTokenInstance}?minutes=1440`)
    const dataOutgoing =  await resOutgoing.json()
    
    return [...dataIncomin, ...dataOutgoing].sort((a, b) => a.timestamp - b.timestamp);
}

export const sendMessage =  async(chatId, message) => {
   const res = await fetch (`${API_URL}/waInstance${settings.idInstance}/sendMessage/${settings.apiTokenInstance}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({chatId, message})
   })
   return await res.json()
}

export const getNotification = async() => {
   const res = await fetch (`${API_URL}/waInstance${settings.idInstance}/receiveNotification/${settings.apiTokenInstance}?receiveTimeout=5`)
   return await res.json()
}

export const deleteNotification = async(receiptId) => {
   const res = await fetch (`${API_URL}/waInstance${settings.idInstance}/deleteNotification/${settings.apiTokenInstance}/${receiptId}`, {
    method: "DELETE",
   })
   return await res.json()
}