import http from "../http-common";

class ResepDataService {
    getAll(){
        return http.get("resep");
    }
    create(data) {
        return http.post("/resep", data);
    }
    findByTitle(title) {
        return http.get(`/resep?title=${title}`);
    }
}

export default new ResepDataService();