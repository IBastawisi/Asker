using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Asker.Models
{
    public class Answer
    {
        public Guid AnswerId { get; set; }
        public Guid QuestionId { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
    public class AnswerPostRequest
    {
        public string UserName { get; set; }
        [Required]
        public Guid QuestionId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
