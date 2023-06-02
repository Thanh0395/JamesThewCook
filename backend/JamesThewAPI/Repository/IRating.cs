using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IRating
    {
        Task<IEnumerable<Rating>> GetAllRating();
        Task<Rating> AddRating(Rating rating);
    }
}
