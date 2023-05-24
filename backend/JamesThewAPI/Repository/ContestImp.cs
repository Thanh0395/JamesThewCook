using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
    public class ContestImp : IContest
    {
        private readonly ProjectS3Context _context;
        public ContestImp(ProjectS3Context context)
        {
            _context = context;
        }
        public Task<IEnumerable<Contest>> GetAllContest()
        {
            throw new NotImplementedException();
        }
    }
}
