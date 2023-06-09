﻿using System;
using System.Collections.Generic;

namespace JamesThewAPI.Entities
{
    public partial class User
    {
        public User()
        {
            Contests = new HashSet<Contest>();
            Feedbacks = new HashSet<Feedback>();
            Memberships = new HashSet<Membership>();
            Posts = new HashSet<Post>();
            Ratings = new HashSet<Rating>();
            RecipeFeedbacks = new HashSet<RecipeFeedback>();
            Recipes = new HashSet<Recipe>();
            SubmissionContests = new HashSet<SubmissionContest>();
        }

        public int UId { get; set; }
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string? Avatar { get; set; }
        public string Password { get; set; } = null!;
        public string? Role { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Contest> Contests { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Membership> Memberships { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<RecipeFeedback> RecipeFeedbacks { get; set; }
        public virtual ICollection<Recipe> Recipes { get; set; }
        public virtual ICollection<SubmissionContest> SubmissionContests { get; set; }
    }
}
