using JamesThewAPI.Entities;
using System.Security.Principal;

namespace JamesThewAPI.Repository
{
    public interface IUser
    {
        //sua tren nhanh main ne pull tu nhanh khach di
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(int UId);
        Task<User> AddUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int UId);

        Task<User> ChangeUserPassAsync(string email, string oldPass, string newPass);
        //Task<User> CheckLogin(string email, string pass);
    }
}
