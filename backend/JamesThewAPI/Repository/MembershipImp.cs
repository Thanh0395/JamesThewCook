using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
    public class MembershipImp : IMembership
    {
        private readonly ProjectS3Context _dbContext;
        public MembershipImp(ProjectS3Context dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Membership> AddMembershipDateAsync(int UserID,int month)
        {
            var membership = await _dbContext.Memberships.SingleOrDefaultAsync(ms=>ms.UId.Equals(UserID));
            if (membership != null)
            {
                if (DateTime.Compare(membership.EndDate, DateTime.Now) >= 0)  return null;
                membership.EndDate = DateTime.Now.AddMonths(month);
                membership.IsMembership = true;
                _dbContext.Entry(membership).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return membership;
            }
            else
            {
                var expDay = DateTime.Now.AddMonths(month);
                var newMembership = new Membership { UId = UserID, IsMembership = true, EndDate = expDay };
                await _dbContext.Memberships.AddAsync(newMembership);
                _dbContext.SaveChanges();
                return newMembership;
            }
        }

        public bool UpdateMembershipStatus(string email)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
            if (user == null) return false;
            else
            {
                var membership = _dbContext.Memberships.SingleOrDefault(ms=>ms.UId == user.UId);
                if (membership == null) return false;
                else
                {
                    bool checkMembership = CheckMembership(membership);
                    return checkMembership;
                }
            }
        }

        public bool CheckMembership(Membership membership)
        {
            DateTime now  = DateTime.Now;
            DateTime expday = membership.EndDate;
            if (DateTime.Compare(expday, now)<0)
            {
                membership.IsMembership = false;
                _dbContext.Entry(membership).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return false;
            }
            else
            {
                membership.IsMembership = true;
                _dbContext.Entry(membership).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
        }

        public async Task<IEnumerable<Membership>> UpdateMembershipAsync()
        {
            var listMembership = await _dbContext.Memberships.ToListAsync();
            foreach (var membership in listMembership)
            {
                CheckMembership(membership);
            }
            return listMembership;
        }
    }
}
