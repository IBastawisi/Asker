using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Models
{
    public class Question
    {
        public Guid QuestionId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public IEnumerable<Answer> Answers { get; set; }
    }

    public class QuestionPutRequest
    {
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
    }

    public class QuestionPostRequest
    {
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
