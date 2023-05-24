using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IFeedback
    {
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<Feedback> GetFeedback(int fbId); 
        Task<Feedback> UpdateFeedback(Feedback feedback);   
        Task<bool> DeleteFeedback(int fbId);
        Task<Feedback> AddFeedback(Feedback feedback);
    }
}
