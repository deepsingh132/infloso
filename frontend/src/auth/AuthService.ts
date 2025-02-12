import axios from "axios";
// import toast from "react-hot-toast";
import { User } from "../../@types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

class AuthService {
  async login(email: string, password: string, rememberMe: boolean): Promise<User> {
    const response = await axios.post(
      API_URL + "/login",
      {
        email,
        password,
        rememberMe
      },
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  async signup(username: string, email: string, password: string) {
    const response = await axios.post(
      API_URL + "/signup",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  }

  async verifyToken() {
    return await axios.post(API_URL + "/verify", {
      token: this.getCurrentUser()?.token,
      withCredentials: true,
    });
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      if (parsedUser.id && parsedUser.username) {
        return parsedUser;
      }
    }
    return null;
  }

  async validateUser() {
    const user = this.getCurrentUser();
    if (user) {
      try {
        const response = await this.verifyToken();
        if (response.status !== 200) {
          // toast.error("Session expired. Please login again.");
          this.logout();
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error: ", error);
        // toast.error("Error verifying user. Please login again.");
        this.logout();
        return false;
      }
    }
    return false;
  }
}

export default new AuthService();
