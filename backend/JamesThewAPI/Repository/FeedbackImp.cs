using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;

namespace JamesThewAPI.Repository
{
    public class FeedbackImp : IFeedback
    {
        private readonly ProjectS3Context _context;
        public FeedbackImp(ProjectS3Context context)
        {
            this._context = context;
        }
        public async Task<Feedback> AddFeedback(Feedback feedback)
        {
            if (feedback != null) {
                _context.Feedbacks.Add(feedback);
                await _context.SaveChangesAsync();
                return feedback;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteFeedback(int fbId)
        {
            var result = await _context.Feedbacks.FindAsync(fbId);
            if (result != null)
            {
                 _context.Remove(result);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
           return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback> GetFeedback(int fbId)
        {
            var feedbackDB = await _context.Feedbacks.FindAsync(fbId);
            if (feedbackDB != null)
            {
                return feedbackDB;
            }
            else
            {
                return null;
            }
        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            var feedbackDB = await _context.Feedbacks.FindAsync(feedback.FbId);
            if (feedbackDB != null)
            {
                _context.Entry(feedback).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return feedback;
            }
            else
            {   
                return null;
            }
        }

		// Hung Them vao API GetFeedbackByPostId
		public async Task<IEnumerable<Feedback>> GetFeedbackByPostId(int pId)
        {
			return await _context.Feedbacks
			.Where(r => r.PId == pId)
			.ToListAsync();
		}

	}
}
