using Asker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Repositories
{
    public class QuestionRepo : IQuestionRepo
    {
        private readonly AskerDbContext context;

        public QuestionRepo(AskerDbContext _context)
        {
            context = _context;
        }
        public async Task<Question> GetQuestion(Guid questionId)
        {
            var question = await context.Questions.Include(x => x.Answers).FirstOrDefaultAsync(x => x.QuestionId == questionId);

            return question;
        }

        public async Task<IEnumerable<Question>> GetQuestions()
        {
            return await context.Questions.ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetQuestionsBySearch(string search)
        {
            return await context.Questions.Where(x => x.Title.Contains(search) || x.Content.Contains(search)).ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetQuestionsByUserId(string userId)
        {
            return await context.Questions.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetUnansweredQuestions()
        {
            return await context.Questions.Where(x => x.Answers.Count() == 0).ToListAsync();
        }

        public async Task<Question> PostQuestion(Question question)
        {
            context.Add(question);
            await context.SaveChangesAsync();

            return question;
        }

        public async Task<Question> PutQuestion(Guid questionId, Question question)
        {
            var record = await GetQuestion(questionId);
            
            EntityEntry old = context.Entry(record);

            old.State = EntityState.Detached;

            EntityEntry entry = context.Entry(question);
            if (entry.State == EntityState.Detached)
            {
                context.Questions.Attach(question);
            }

            entry.State = EntityState.Modified;
            await context.SaveChangesAsync();

            return question;

        }

        public async Task DeleteQuestion(Question question)
        {
            context.Questions.Remove(question);
            await context.SaveChangesAsync();
        }

        public bool QuestionExists(Guid questionId)
        {
            return context.Questions.Any(e => e.QuestionId == questionId);
        }
    }
}
