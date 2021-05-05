import { API_URL } from "./Service"
export default formatImage = (gambar) => {
    return gambar.includes("http") ? gambar : `${API_URL}/${gambar}`
}