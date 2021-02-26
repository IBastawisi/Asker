using Asker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Repositories
{
    public class AnswerRepo : IAnswerRepo
    {
        private readonly AskerDbContext context;

        public AnswerRepo(AskerDbContext _context)
        {
            context = _context;
        }

        public async Task<Answer> GetAnswer(Guid answerId)
        {
            return await context.Answers.FindAsync(answerId);
        }

        public async Task<IEnumerable<Answer>> GetAnswersByUserId(string userId)
        {
            return await context.Answers.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Answer>> GetAnswersByQuestionId(Guid questionId)
        {
            return await context.Answers.Where(x => x.QuestionId == questionId).ToListAsync();
        }

        public async Task<Answer> PostAnswer(Answer answer)
        {
            context.Add(answer);
            await context.SaveChangesAsync();
            return answer;
        }

    }
}
