using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IContest
    {
        Task<IEnumerable<Contest>> GetAllContest();
    }
}
