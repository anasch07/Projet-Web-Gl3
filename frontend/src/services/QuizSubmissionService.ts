import apiService from './ApiService';

class QuizSubmissionService {
  async save(data: any): Promise<any> {
    return (await apiService.post('/api/quiz-submission', data)).data;
  }
  // async findAll(): Promise<any> {
  //   return (await apiService.get<any>('/api/quiz')).data;
  // }
  // async  findOne(id: string): Promise<any> {
  //   return (await apiService.get<any>(`/api/quiz/${id}`)).data;
  // }

  // async update(id: string, data: any): Promise<any> {
  //   return await apiService.put(`/api/quiz/${id}`, data);
  // }

  // async delete(id: string): Promise<any> {
  //   return await apiService.delete(`/api/quiz/${id}`);
  // }
}




export default new QuizSubmissionService();
