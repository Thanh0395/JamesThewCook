using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.Rating;

namespace JamesThewAPI.Repository
{
    public interface ISubmissionContest
    {
        Task<IEnumerable<SubmissionContest>> GetAllSC();
        Task<IEnumerable<SubmissionContest>> GetSCById(int id);
        Task<IEnumerable<SubmissionContest>> GetSCByUId(int id);
        Task<SubmissionContest> AddSC(SubmissionContest sc, IFormFile file);
        Task<SubmissionContest> UpdateSC(SubmissionContest sc, IFormFile file);
        Task<IEnumerable<TotalRatingModel>> GetAverageScore();
        Task<User> GetWinner(int contestID);

        Task<bool> DeleteSC(int id);
    }
}
