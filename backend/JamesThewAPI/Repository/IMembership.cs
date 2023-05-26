using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IMembership
    {
        Task<Membership> AddMembershipDateAsync(int UserID, int month);
        bool CheckMembership(Membership membership);
        bool UpdateMembershipStatus(string email);
        Task<IEnumerable<Membership>> UpdateMembershipAsync();
    }
}
