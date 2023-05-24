using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IContest
    {
        Task<IEnumerable<Contest>> GetAllContest();
        Task<Contest> GetContestById(int id);
        Task<Contest> AddContest(Contest contest, IFormFile file);
        Task<Contest> UpdateContest(Contest contest, IFormFile file);
        Task<bool> DeleteContest(int id);

    }
}
