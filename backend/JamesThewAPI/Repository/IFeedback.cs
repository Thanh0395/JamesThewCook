using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IFeedback
    {
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<Feedback> GetFeedback(int id); 
        Task<Feedback> UpdateFeedback(Feedback feedback);   
        Task<Feedback> DeleteFeedback(int id);
        Task<Feedback> CreateFeedback(Feedback feedback);
    }
}
