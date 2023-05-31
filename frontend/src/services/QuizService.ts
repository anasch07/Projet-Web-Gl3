import Course from '../models/course/Course';
import CourseQuery from '../models/course/CourseQuery';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import UpdateCourseRequest from '../models/course/UpdateCourseRequest';
import apiService from './ApiService';

class QuizService {
  async save(data: any): Promise<void> {
    await apiService.post('/api/courses', data);
  }
}

export default new QuizService();
