using Asker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Repositories
{
    public interface IQuestionRepo
    {
        Task<IEnumerable<Question>> GetQuestions();
        Task<IEnumerable<Question>> GetQuestionsBySearch(string search);
        Task<IEnumerable<Question>> GetQuestionsByUserId(string userId);
        Task<IEnumerable<Question>> GetUnansweredQuestions();
        Task<Question> GetQuestion(Guid questionId);
        bool QuestionExists(Guid questionId);
        Task<Question> PostQuestion(Question question);
        Task<Question> PutQuestion(Guid questionId, Question question);
        Task DeleteQuestion(Question question);

    }
}
