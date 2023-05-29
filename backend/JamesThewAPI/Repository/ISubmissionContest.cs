using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface ISubmissionContest
    {
        Task<IEnumerable<SubmissionContest>> GetAllSC();
        Task<SubmissionContest> GetSCById(int id);
        Task<SubmissionContest> AddSC(SubmissionContest sc, IFormFile file);
        Task<SubmissionContest> UpdateSC(SubmissionContest sc, IFormFile file);
        Task<bool> DeleteSC(int id);
    }
}
