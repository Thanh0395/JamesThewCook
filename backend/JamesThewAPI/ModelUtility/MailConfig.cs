using System.ComponentModel.DataAnnotations;

namespace JamesThewAPI.ModelUtility
{
    public class MailConfig
    {
        [Required]
        public string ToMail { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
    }
}
