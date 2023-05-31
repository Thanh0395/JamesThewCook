using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
    public class RatingImp : IRating
    {
        private readonly ProjectS3Context _dbContext;
        public RatingImp(ProjectS3Context dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Rating> AddRating(Rating rating)
        {
            if (rating != null)
            {
                await _dbContext.Ratings.AddAsync(rating);
                await _dbContext.SaveChangesAsync();
                return rating;
            }
            else
            {
                return null;
            }
        }

        public async Task<IEnumerable<Rating>> GetAllRating()
        {
            return await _dbContext.Ratings.ToListAsync();
        }
    }
}
