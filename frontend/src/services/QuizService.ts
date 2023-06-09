import Course from '../models/course/Course';
import CourseQuery from '../models/course/CourseQuery';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import UpdateCourseRequest from '../models/course/UpdateCourseRequest';
import apiService from './ApiService';

class QuizService {
  async save(data: any): Promise<void> {
    return await apiService.post('/api/quiz', data);
  }
  async findAll(): Promise<any> {
    return (await apiService.get<any>('/api/quiz')).data;
  }
  async  findOne(id: string): Promise<any> {
    return (await apiService.get<any>(`/api/quiz/${id}`)).data;
  }


  async update(id: string, data: any): Promise<any> {
    return await apiService.put(`/api/quiz/${id}`, data);
  }

  async delete(id: string): Promise<any> {
    return await apiService.delete(`/api/quiz/${id}`);
  }



}




export default new QuizService();
