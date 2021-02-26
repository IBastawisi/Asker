using Asker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Repositories
{
    public interface IAnswerRepo
    {
        Task<Answer> GetAnswer(Guid answerId);
        Task<IEnumerable<Answer>> GetAnswersByUserId(string userId);
        Task<Answer> PostAnswer(Answer answer);
        Task<IEnumerable<Answer>> GetAnswersByQuestionId(Guid questionId);
    }
}
