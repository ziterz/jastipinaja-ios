import api from '../api'

async function login(email, password, playerId){
    const response = await api.post("/login", {
        email : email,
        password : password,
        player_id : playerId
    });

    if (response.status == 200){
        
    }
}