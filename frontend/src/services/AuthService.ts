import axios from 'axios';

import AuthResponse from '../models/auth/AuthResponse';
import LoginRequest from '../models/auth/SignupRequest';
import SignupRequest from '../models/auth/SignupRequest';
import apiService from './ApiService';

class AuthService {
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const authResponse = (
      await axios.post<AuthResponse>('/api/auth/login', loginRequest, {
        withCredentials: true,
      })
    ).data;
    apiService.defaults.headers.Authorization = `Bearer ${authResponse.token}`;
    return authResponse;
  }



  async signup(signupRequest: SignupRequest): Promise<AuthResponse> {

    return (
        await axios.post<AuthResponse>('/api/auth/register', signupRequest, {
          withCredentials: true,
        })
    ).data;
    }

  async logout(): Promise<void> {
    await apiService.post('/api/auth/logout', {}, { withCredentials: true });
    apiService.defaults.headers.Authorization = null;
  }





  async refresh(): Promise<AuthResponse> {
    const authResponse = (
      await axios.post<AuthResponse>(
        '/api/auth/refresh',
        {},
        { withCredentials: true },
      )
    ).data;
    apiService.defaults.headers.Authorization = `Bearer ${authResponse.token}`;
    return authResponse;
  }
}

export default new AuthService();
