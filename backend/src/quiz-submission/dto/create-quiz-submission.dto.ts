export class CreateQuizSubmissionDto {
  fr:FormResponse

  idQuizz: string
}

type FormResponse= {
  [key: string]: string
}