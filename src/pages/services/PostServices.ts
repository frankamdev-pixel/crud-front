import axios from "axios";
import type { Post } from "../types/Post";

const App_URL = "http://127.0.0.1:8000/api";

export const getPosts = () => axios.get<Post[]>(`${App_URL}/posts`);